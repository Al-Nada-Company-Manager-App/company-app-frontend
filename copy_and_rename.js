const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src/components/Receipts');
const destDir = path.join(__dirname, 'src/components/DeliveryNotes');

function copyAndReplace(src, dest) {
  if (fs.statSync(src).isDirectory()) {
    fs.mkdirSync(dest, { recursive: true });
    fs.readdirSync(src).forEach(file => {
      let destFile = file.replace(/Receipt/g, 'Delivery').replace(/receipt/g, 'delivery');
      copyAndReplace(path.join(src, file), path.join(dest, destFile));
    });
  } else {
    let content = fs.readFileSync(src, 'utf8');
    content = content
      .replace(/Receipts/g, 'Deliveries')
      .replace(/Receipt Note/g, 'Delivery Note')
      .replace(/Receipt/g, 'Delivery')
      .replace(/receipts/g, 'deliveries')
      .replace(/receipt/g, 'delivery')
      .replace(/rn_/g, 'dn_')
      .replace(/إذن استلام/g, 'إذن تسليم')
      .replace(/useGetAllDeliveries, useDeleteDelivery/g, 'useGetAllDeliveries, useDeleteDelivery'); // just a check
    
    // Also change queries import
    content = content.replace(/@src\/queries\/Deliveries/g, '@src/queries/DeliveryNotes');
    
    fs.writeFileSync(dest, content);
  }
}

copyAndReplace(srcDir, destDir);
console.log('Done copying and renaming.');
