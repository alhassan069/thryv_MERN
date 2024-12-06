const fs = require('fs');
const path = require('path');
const sequelize = require('../config/database'); 
const Product = require('../models/Product');

(async () => {
  try {
    const filePath = path.join(__dirname, 'products.json');
    const productsData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    const formattedProducts = productsData.map((product) => ({
      id: product.id,
      name: product.title,
      description: product.description,
      price: product.price,
      imageUrl: product.image,
    }));

    
    await sequelize.authenticate();
    console.log('Database connection successful.');

    
    await Product.sync({ alter: true });

    
    await Product.bulkCreate(formattedProducts, { ignoreDuplicates: true });
    console.log('Products inserted successfully.');

    process.exit(0);
  } catch (error) {
    console.error('Error inserting products:', error);
    process.exit(1);
  }
})();
