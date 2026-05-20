export interface IndianFood {
  name: string;
  category: string;
  region: string;
  mealType: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack';
  calories: number;
  protein: number;
  carbs: number;
  fiber: number;
  fat: number;
  servingSize: number;
  tags: string[];
}

export const indianFoods: IndianFood[] = [
  // NORTH INDIAN - BREAKFAST
  { name: 'Aloo Paratha', category: 'Bread', region: 'North Indian', mealType: 'Breakfast', calories: 280, protein: 6, carbs: 38, fiber: 3, fat: 12, servingSize: 100, tags: ['potato', 'wheat', 'stuffed', 'vegetarian'] },
  { name: 'Gobi Paratha', category: 'Bread', region: 'North Indian', mealType: 'Breakfast', calories: 250, protein: 5, carbs: 35, fiber: 4, fat: 10, servingSize: 100, tags: ['cauliflower', 'wheat', 'stuffed', 'vegetarian'] },
  { name: 'Paneer Paratha', category: 'Bread', region: 'North Indian', mealType: 'Breakfast', calories: 310, protein: 12, carbs: 32, fiber: 2, fat: 15, servingSize: 100, tags: ['paneer', 'wheat', 'stuffed', 'vegetarian', 'high-protein'] },
  { name: 'Poori', category: 'Bread', region: 'North Indian', mealType: 'Breakfast', calories: 320, protein: 7, carbs: 35, fiber: 2, fat: 18, servingSize: 100, tags: ['wheat', 'fried', 'vegetarian'] },
  { name: 'Bhature', category: 'Bread', region: 'North Indian', mealType: 'Breakfast', calories: 350, protein: 9, carbs: 42, fiber: 2, fat: 16, servingSize: 100, tags: ['maida', 'fried', 'vegetarian'] },
  { name: 'Chole Bhature', category: 'Combo', region: 'North Indian', mealType: 'Breakfast', calories: 450, protein: 14, carbs: 58, fiber: 8, fat: 18, servingSize: 100, tags: ['chickpeas', 'maida', 'combo', 'vegetarian', 'high-protein'] },
  { name: 'Aloo Puri', category: 'Combo', region: 'North Indian', mealType: 'Breakfast', calories: 380, protein: 8, carbs: 42, fiber: 4, fat: 20, servingSize: 100, tags: ['potato', 'wheat', 'fried', 'vegetarian'] },
  { name: 'Poha (Flattened Rice)', category: 'Rice', region: 'North Indian', mealType: 'Breakfast', calories: 180, protein: 4, carbs: 32, fiber: 1, fat: 4, servingSize: 100, tags: ['rice', 'light', 'vegetarian'] },
  { name: 'Upma', category: 'Semolina', region: 'North Indian', mealType: 'Breakfast', calories: 160, protein: 4, carbs: 28, fiber: 2, fat: 4, servingSize: 100, tags: ['semolina', 'light', 'vegetarian'] },
  { name: 'Halwa Poori', category: 'Combo', region: 'North Indian', mealType: 'Breakfast', calories: 480, protein: 10, carbs: 58, fiber: 3, fat: 24, servingSize: 100, tags: ['sweet', 'maida', 'fried', 'vegetarian'] },

  // SOUTH INDIAN - BREAKFAST
  { name: 'Masala Dosa', category: 'Crepe', region: 'South Indian', mealType: 'Breakfast', calories: 180, protein: 5, carbs: 30, fiber: 2, fat: 5, servingSize: 100, tags: ['rice', 'potato', 'fermented', 'vegetarian', 'low-fat'] },
  { name: 'Plain Dosa', category: 'Crepe', region: 'South Indian', mealType: 'Breakfast', calories: 150, protein: 4, carbs: 28, fiber: 1, fat: 3, servingSize: 100, tags: ['rice', 'fermented', 'vegetarian', 'low-fat'] },
  { name: 'Rava Dosa', category: 'Crepe', region: 'South Indian', mealType: 'Breakfast', calories: 170, protein: 4, carbs: 26, fiber: 1, fat: 5, servingSize: 100, tags: ['semolina', 'crispy', 'vegetarian'] },
  { name: 'Mysore Masala Dosa', category: 'Crepe', region: 'South Indian', mealType: 'Breakfast', calories: 210, protein: 6, carbs: 30, fiber: 2, fat: 8, servingSize: 100, tags: ['rice', 'spicy', 'potato', 'vegetarian'] },
  { name: 'Idli (3 pieces)', category: 'Steamed', region: 'South Indian', mealType: 'Breakfast', calories: 120, protein: 5, carbs: 24, fiber: 1, fat: 1, servingSize: 100, tags: ['rice', 'steamed', 'fermented', 'vegetarian', 'low-fat', 'light'] },
  { name: 'Medu Vada (2 pieces)', category: 'Fried', region: 'South Indian', mealType: 'Breakfast', calories: 280, protein: 8, carbs: 28, fiber: 3, fat: 15, servingSize: 100, tags: ['lentil', 'fried', 'vegetarian'] },
  { name: 'Uttapam', category: 'Pancake', region: 'South Indian', mealType: 'Breakfast', calories: 160, protein: 5, carbs: 26, fiber: 2, fat: 4, servingSize: 100, tags: ['rice', 'vegetable', 'fermented', 'vegetarian'] },
  { name: 'Pesarattu (Green Gram Dosa)', category: 'Crepe', region: 'South Indian', mealType: 'Breakfast', calories: 150, protein: 9, carbs: 22, fiber: 4, fat: 3, servingSize: 100, tags: ['moong', 'high-protein', 'vegetarian', 'low-fat'] },
  { name: 'Appam with Stew', category: 'Combo', region: 'South Indian', mealType: 'Breakfast', calories: 240, protein: 6, carbs: 35, fiber: 2, fat: 8, servingSize: 100, tags: ['rice', 'coconut', 'vegetarian'] },
  { name: 'Puttu with Kadala', category: 'Combo', region: 'South Indian', mealType: 'Breakfast', calories: 260, protein: 10, carbs: 38, fiber: 5, fat: 8, servingSize: 100, tags: ['rice', 'chickpeas', 'vegetarian', 'high-protein'] },
  { name: 'Idiyappam', category: 'Noodle', region: 'South Indian', mealType: 'Breakfast', calories: 140, protein: 3, carbs: 28, fiber: 1, fat: 2, servingSize: 100, tags: ['rice', 'steamed', 'vegetarian', 'low-fat'] },

  // WEST INDIAN - BREAKFAST
  { name: 'Poha (Kanda Poha)', category: 'Rice', region: 'West Indian', mealType: 'Breakfast', calories: 180, protein: 4, carbs: 32, fiber: 1, fat: 4, servingSize: 100, tags: ['flattened rice', 'onion', 'light', 'vegetarian'] },
  { name: 'Sabudana Khichdi', category: 'Tapioca', region: 'West Indian', mealType: 'Breakfast', calories: 220, protein: 2, carbs: 42, fiber: 1, fat: 5, servingSize: 100, tags: ['tapioca', 'peanuts', 'fasting', 'vegetarian'] },
  { name: 'Sabudana Vada (2 pieces)', category: 'Fried', region: 'West Indian', mealType: 'Breakfast', calories: 260, protein: 4, carbs: 38, fiber: 1, fat: 11, servingSize: 100, tags: ['tapioca', 'fried', 'fasting', 'vegetarian'] },
  { name: 'Thalipeeth', category: 'Bread', region: 'West Indian', mealType: 'Breakfast', calories: 200, protein: 7, carbs: 30, fiber: 4, fat: 6, servingSize: 100, tags: ['multigrain', 'spiced', 'vegetarian'] },
  { name: 'Misal Pav', category: 'Combo', region: 'West Indian', mealType: 'Breakfast', calories: 320, protein: 12, carbs: 45, fiber: 6, fat: 10, servingSize: 100, tags: ['sprouts', 'spicy', 'bread', 'vegetarian', 'high-protein'] },
  { name: 'Kanda Poha with Chai', category: 'Combo', region: 'West Indian', mealType: 'Breakfast', calories: 240, protein: 5, carbs: 38, fiber: 1, fat: 7, servingSize: 100, tags: ['flattened rice', 'tea', 'light', 'vegetarian'] },

  // EAST INDIAN - BREAKFAST
  { name: 'Luchi with Aloor Dum', category: 'Combo', region: 'East Indian', mealType: 'Breakfast', calories: 380, protein: 7, carbs: 45, fiber: 3, fat: 18, servingSize: 100, tags: ['maida', 'potato', 'fried', 'vegetarian'] },
  { name: 'Cholar Dal with Luchi', category: 'Combo', region: 'East Indian', mealType: 'Breakfast', calories: 340, protein: 12, carbs: 48, fiber: 6, fat: 10, servingSize: 100, tags: ['chickpeas', 'maida', 'vegetarian', 'high-protein'] },
  { name: 'Radhaballavi', category: 'Bread', region: 'East Indian', mealType: 'Breakfast', calories: 320, protein: 10, carbs: 38, fiber: 4, fat: 14, servingSize: 100, tags: ['lentil', 'stuffed', 'fried', 'vegetarian'] },
  { name: 'Panta Bhat with Aloor Bhaja', category: 'Combo', region: 'East Indian', mealType: 'Breakfast', calories: 220, protein: 5, carbs: 40, fiber: 2, fat: 5, servingSize: 100, tags: ['fermented rice', 'potato', 'vegetarian'] },
  { name: 'Kachori (Bengali)', category: 'Fried', region: 'East Indian', mealType: 'Breakfast', calories: 300, protein: 8, carbs: 35, fiber: 3, fat: 15, servingSize: 100, tags: ['lentil', 'fried', 'spiced', 'vegetarian'] },

  // NORTH INDIAN - LUNCH/DINNER - ROTI/BREAD
  { name: 'Chapati (Plain)', category: 'Bread', region: 'North Indian', mealType: 'Lunch', calories: 120, protein: 4, carbs: 20, fiber: 2, fat: 2, servingSize: 100, tags: ['wheat', 'staple', 'vegetarian', 'low-fat'] },
  { name: 'Tandoori Roti', category: 'Bread', region: 'North Indian', mealType: 'Lunch', calories: 130, protein: 4, carbs: 22, fiber: 2, fat: 2, servingSize: 100, tags: ['wheat', 'tandoor', 'vegetarian', 'low-fat'] },
  { name: 'Naan (Plain)', category: 'Bread', region: 'North Indian', mealType: 'Lunch', calories: 260, protein: 8, carbs: 42, fiber: 2, fat: 6, servingSize: 100, tags: ['maida', 'tandoor', 'vegetarian'] },
  { name: 'Butter Naan', category: 'Bread', region: 'North Indian', mealType: 'Lunch', calories: 320, protein: 8, carbs: 42, fiber: 2, fat: 14, servingSize: 100, tags: ['maida', 'butter', 'tandoor', 'vegetarian'] },
  { name: 'Garlic Naan', category: 'Bread', region: 'North Indian', mealType: 'Lunch', calories: 300, protein: 8, carbs: 40, fiber: 2, fat: 12, servingSize: 100, tags: ['maida', 'garlic', 'tandoor', 'vegetarian'] },
  { name: 'Aloo Paratha with Curd', category: 'Combo', region: 'North Indian', mealType: 'Lunch', calories: 320, protein: 9, carbs: 42, fiber: 3, fat: 14, servingSize: 100, tags: ['potato', 'wheat', 'curd', 'vegetarian'] },
  { name: 'Rumali Roti', category: 'Bread', region: 'North Indian', mealType: 'Lunch', calories: 240, protein: 7, carbs: 38, fiber: 1, fat: 7, servingSize: 100, tags: ['maida', 'thin', 'vegetarian'] },
  { name: 'Missi Roti', category: 'Bread', region: 'North Indian', mealType: 'Lunch', calories: 180, protein: 8, carbs: 26, fiber: 4, fat: 5, servingSize: 100, tags: ['gram flour', 'wheat', 'vegetarian', 'high-protein'] },
  { name: 'Bajra Roti', category: 'Bread', region: 'North Indian', mealType: 'Lunch', calories: 160, protein: 6, carbs: 24, fiber: 5, fat: 4, servingSize: 100, tags: ['millet', 'gluten-free', 'vegetarian', 'high-fiber'] },
  { name: 'Jowar Roti', category: 'Bread', region: 'North Indian', mealType: 'Lunch', calories: 150, protein: 5, carbs: 24, fiber: 4, fat: 3, servingSize: 100, tags: ['millet', 'gluten-free', 'vegetarian', 'high-fiber'] },
  { name: 'Makki di Roti', category: 'Bread', region: 'North Indian', mealType: 'Lunch', calories: 170, protein: 4, carbs: 26, fiber: 3, fat: 5, servingSize: 100, tags: ['corn', 'gluten-free', 'vegetarian'] },
  { name: 'Laccha Paratha', category: 'Bread', region: 'North Indian', mealType: 'Lunch', calories: 300, protein: 6, carbs: 35, fiber: 2, fat: 15, servingSize: 100, tags: ['wheat', 'layered', 'vegetarian'] },
  { name: 'Stuffed Kulcha', category: 'Bread', region: 'North Indian', mealType: 'Lunch', calories: 280, protein: 8, carbs: 38, fiber: 2, fat: 11, servingSize: 100, tags: ['maida', 'stuffed', 'tandoor', 'vegetarian'] },

  // NORTH INDIAN - LUNCH/DINNER - DAL/LENTILS
  { name: 'Dal Tadka', category: 'Dal', region: 'North Indian', mealType: 'Lunch', calories: 140, protein: 8, carbs: 18, fiber: 5, fat: 4, servingSize: 100, tags: ['lentil', 'tempered', 'vegetarian', 'high-protein'] },
  { name: 'Dal Makhani', category: 'Dal', region: 'North Indian', mealType: 'Lunch', calories: 220, protein: 10, carbs: 20, fiber: 6, fat: 12, servingSize: 100, tags: ['black lentil', 'cream', 'butter', 'vegetarian', 'high-protein'] },
  { name: 'Chana Dal', category: 'Dal', region: 'North Indian', mealType: 'Lunch', calories: 160, protein: 10, carbs: 22, fiber: 7, fat: 3, servingSize: 100, tags: ['split chickpeas', 'vegetarian', 'high-protein', 'high-fiber'] },
  { name: 'Moong Dal', category: 'Dal', region: 'North Indian', mealType: 'Lunch', calories: 130, protein: 9, carbs: 18, fiber: 5, fat: 3, servingSize: 100, tags: ['yellow lentil', 'light', 'vegetarian', 'high-protein'] },
  { name: 'Masoor Dal', category: 'Dal', region: 'North Indian', mealType: 'Lunch', calories: 140, protein: 9, carbs: 20, fiber: 6, fat: 3, servingSize: 100, tags: ['red lentil', 'vegetarian', 'high-protein', 'high-fiber'] },
  { name: 'Sambar', category: 'Dal', region: 'North Indian', mealType: 'Lunch', calories: 120, protein: 6, carbs: 18, fiber: 5, fat: 3, servingSize: 100, tags: ['lentil', 'vegetable', 'tamarind', 'vegetarian'] },
  { name: 'Rajma (Kidney Bean Curry)', category: 'Dal', region: 'North Indian', mealType: 'Lunch', calories: 180, protein: 11, carbs: 26, fiber: 8, fat: 4, servingSize: 100, tags: ['kidney beans', 'vegetarian', 'high-protein', 'high-fiber'] },
  { name: 'Chole (Chickpea Curry)', category: 'Dal', region: 'North Indian', mealType: 'Lunch', calories: 200, protein: 12, carbs: 28, fiber: 9, fat: 5, servingSize: 100, tags: ['chickpeas', 'spiced', 'vegetarian', 'high-protein', 'high-fiber'] },
  { name: 'Kadhi Pakora', category: 'Dal', region: 'North Indian', mealType: 'Lunch', calories: 180, protein: 7, carbs: 16, fiber: 2, fat: 10, servingSize: 100, tags: ['yogurt', 'gram flour', 'fried', 'vegetarian'] },
  { name: 'Panchmel Dal', category: 'Dal', region: 'North Indian', mealType: 'Lunch', calories: 150, protein: 10, carbs: 20, fiber: 7, fat: 3, servingSize: 100, tags: ['five lentils', 'rajasthani', 'vegetarian', 'high-protein'] },

  // NORTH INDIAN - LUNCH/DINNER - CURRY/VEGETABLES
  { name: 'Palak Paneer', category: 'Curry', region: 'North Indian', mealType: 'Lunch', calories: 200, protein: 12, carbs: 10, fiber: 4, fat: 14, servingSize: 100, tags: ['spinach', 'paneer', 'vegetarian', 'high-protein'] },
  { name: 'Paneer Butter Masala', category: 'Curry', region: 'North Indian', mealType: 'Lunch', calories: 280, protein: 14, carbs: 12, fiber: 2, fat: 20, servingSize: 100, tags: ['paneer', 'butter', 'tomato', 'vegetarian', 'high-protein'] },
  { name: 'Shahi Paneer', category: 'Curry', region: 'North Indian', mealType: 'Lunch', calories: 260, protein: 13, carbs: 14, fiber: 2, fat: 18, servingSize: 100, tags: ['paneer', 'cream', 'cashew', 'vegetarian', 'high-protein'] },
  { name: 'Kadai Paneer', category: 'Curry', region: 'North Indian', mealType: 'Lunch', calories: 220, protein: 12, carbs: 10, fiber: 3, fat: 15, servingSize: 100, tags: ['paneer', 'capsicum', 'spiced', 'vegetarian', 'high-protein'] },
  { name: 'Matar Paneer', category: 'Curry', region: 'North Indian', mealType: 'Lunch', calories: 210, protein: 11, carbs: 16, fiber: 4, fat: 12, servingSize: 100, tags: ['paneer', 'peas', 'vegetarian', 'high-protein'] },
  { name: 'Aloo Gobi', category: 'Curry', region: 'North Indian', mealType: 'Lunch', calories: 140, protein: 4, carbs: 20, fiber: 4, fat: 5, servingSize: 100, tags: ['potato', 'cauliflower', 'vegetarian', 'low-fat'] },
  { name: 'Aloo Matar', category: 'Curry', region: 'North Indian', mealType: 'Lunch', calories: 160, protein: 5, carbs: 24, fiber: 4, fat: 5, servingSize: 100, tags: ['potato', 'peas', 'vegetarian'] },
  { name: 'Bhindi Masala', category: 'Curry', region: 'North Indian', mealType: 'Lunch', calories: 120, protein: 4, carbs: 14, fiber: 5, fat: 6, servingSize: 100, tags: ['okra', 'vegetarian', 'high-fiber'] },
  { name: 'Baingan Bharta', category: 'Curry', region: 'North Indian', mealType: 'Lunch', calories: 140, protein: 3, carbs: 12, fiber: 5, fat: 9, servingSize: 100, tags: ['eggplant', 'smoky', 'vegetarian'] },
  { name: 'Mix Veg Curry', category: 'Curry', region: 'North Indian', mealType: 'Lunch', calories: 130, protein: 4, carbs: 16, fiber: 4, fat: 6, servingSize: 100, tags: ['mixed vegetables', 'vegetarian'] },
  { name: 'Mushroom Masala', category: 'Curry', region: 'North Indian', mealType: 'Lunch', calories: 120, protein: 6, carbs: 10, fiber: 3, fat: 7, servingSize: 100, tags: ['mushroom', 'spiced', 'vegetarian'] },
  { name: 'Malai Kofta', category: 'Curry', region: 'North Indian', mealType: 'Lunch', calories: 320, protein: 10, carbs: 24, fiber: 3, fat: 22, servingSize: 100, tags: ['paneer', 'potato', 'cream', 'fried', 'vegetarian'] },
  { name: 'Navratan Korma', category: 'Curry', region: 'North Indian', mealType: 'Lunch', calories: 240, protein: 8, carbs: 20, fiber: 4, fat: 15, servingSize: 100, tags: ['mixed vegetables', 'nuts', 'cream', 'vegetarian'] },
  { name: 'Jeera Aloo', category: 'Curry', region: 'North Indian', mealType: 'Lunch', calories: 160, protein: 3, carbs: 24, fiber: 2, fat: 6, servingSize: 100, tags: ['potato', 'cumin', 'simple', 'vegetarian'] },
  { name: 'Dum Aloo', category: 'Curry', region: 'North Indian', mealType: 'Lunch', calories: 200, protein: 5, carbs: 26, fiber: 3, fat: 9, servingSize: 100, tags: ['potato', 'kashmiri', 'spiced', 'vegetarian'] },
  { name: 'Lauki Ki Sabzi', category: 'Curry', region: 'North Indian', mealType: 'Lunch', calories: 80, protein: 3, carbs: 10, fiber: 3, fat: 3, servingSize: 100, tags: ['bottle gourd', 'light', 'vegetarian', 'low-calorie'] },
  { name: 'Tinda Masala', category: 'Curry', region: 'North Indian', mealType: 'Lunch', calories: 90, protein: 3, carbs: 12, fiber: 3, fat: 4, servingSize: 100, tags: ['apple gourd', 'light', 'vegetarian', 'low-calorie'] },
  { name: 'Karela Bharta', category: 'Curry', region: 'North Indian', mealType: 'Lunch', calories: 100, protein: 3, carbs: 12, fiber: 4, fat: 5, servingSize: 100, tags: ['bitter gourd', 'vegetarian', 'low-calorie'] },

  // NORTH INDIAN - LUNCH/DINNER - RICE
  { name: 'Steamed Rice', category: 'Rice', region: 'North Indian', mealType: 'Lunch', calories: 130, protein: 3, carbs: 28, fiber: 1, fat: 0, servingSize: 100, tags: ['rice', 'staple', 'vegetarian', 'low-fat'] },
  { name: 'Jeera Rice', category: 'Rice', region: 'North Indian', mealType: 'Lunch', calories: 160, protein: 3, carbs: 30, fiber: 1, fat: 3, servingSize: 100, tags: ['rice', 'cumin', 'vegetarian'] },
  { name: 'Veg Biryani', category: 'Rice', region: 'North Indian', mealType: 'Lunch', calories: 220, protein: 6, carbs: 36, fiber: 3, fat: 6, servingSize: 100, tags: ['rice', 'mixed vegetables', 'spiced', 'vegetarian'] },
  { name: 'Veg Pulao', category: 'Rice', region: 'North Indian', mealType: 'Lunch', calories: 180, protein: 5, carbs: 30, fiber: 2, fat: 5, servingSize: 100, tags: ['rice', 'vegetables', 'vegetarian'] },
  { name: 'Kashmiri Pulao', category: 'Rice', region: 'North Indian', mealType: 'Lunch', calories: 220, protein: 5, carbs: 34, fiber: 2, fat: 8, servingSize: 100, tags: ['rice', 'nuts', 'dried fruits', 'sweet', 'vegetarian'] },
  { name: 'Curd Rice', category: 'Rice', region: 'North Indian', mealType: 'Lunch', calories: 150, protein: 5, carbs: 26, fiber: 0, fat: 3, servingSize: 100, tags: ['rice', 'yogurt', 'cooling', 'vegetarian'] },
  { name: 'Lemon Rice', category: 'Rice', region: 'North Indian', mealType: 'Lunch', calories: 170, protein: 4, carbs: 30, fiber: 1, fat: 4, servingSize: 100, tags: ['rice', 'lemon', 'tempered', 'vegetarian'] },
  { name: 'Coconut Rice', category: 'Rice', region: 'North Indian', mealType: 'Lunch', calories: 190, protein: 4, carbs: 28, fiber: 2, fat: 7, servingSize: 100, tags: ['rice', 'coconut', 'vegetarian'] },
  { name: 'Khichdi', category: 'Rice', region: 'North Indian', mealType: 'Lunch', calories: 140, protein: 6, carbs: 24, fiber: 3, fat: 2, servingSize: 100, tags: ['rice', 'lentil', 'comfort', 'vegetarian', 'light'] },
  { name: 'Dal Khichdi', category: 'Rice', region: 'North Indian', mealType: 'Lunch', calories: 160, protein: 7, carbs: 26, fiber: 4, fat: 3, servingSize: 100, tags: ['rice', 'lentil', 'ghee', 'vegetarian'] },

  // NORTH INDIAN - LUNCH/DINNER - NON-VEG
  { name: 'Butter Chicken', category: 'Non-Veg', region: 'North Indian', mealType: 'Lunch', calories: 280, protein: 22, carbs: 8, fiber: 1, fat: 18, servingSize: 100, tags: ['chicken', 'butter', 'tomato', 'cream', 'high-protein'] },
  { name: 'Chicken Tikka Masala', category: 'Non-Veg', region: 'North Indian', mealType: 'Lunch', calories: 240, protein: 24, carbs: 8, fiber: 2, fat: 13, servingSize: 100, tags: ['chicken', 'grilled', 'spiced', 'high-protein'] },
  { name: 'Chicken Curry', category: 'Non-Veg', region: 'North Indian', mealType: 'Lunch', calories: 200, protein: 22, carbs: 6, fiber: 2, fat: 10, servingSize: 100, tags: ['chicken', 'onion', 'tomato', 'high-protein'] },
  { name: 'Tandoori Chicken', category: 'Non-Veg', region: 'North Indian', mealType: 'Lunch', calories: 180, protein: 26, carbs: 2, fiber: 0, fat: 7, servingSize: 100, tags: ['chicken', 'tandoor', 'marinated', 'high-protein', 'low-carb'] },
  { name: 'Chicken Biryani', category: 'Non-Veg', region: 'North Indian', mealType: 'Lunch', calories: 260, protein: 16, carbs: 32, fiber: 2, fat: 8, servingSize: 100, tags: ['chicken', 'rice', 'spiced', 'high-protein'] },
  { name: 'Mutton Rogan Josh', category: 'Non-Veg', region: 'North Indian', mealType: 'Lunch', calories: 300, protein: 24, carbs: 6, fiber: 1, fat: 20, servingSize: 100, tags: ['mutton', 'kashmiri', 'spiced', 'high-protein'] },
  { name: 'Mutton Curry', category: 'Non-Veg', region: 'North Indian', mealType: 'Lunch', calories: 280, protein: 22, carbs: 6, fiber: 2, fat: 18, servingSize: 100, tags: ['mutton', 'onion', 'tomato', 'high-protein'] },
  { name: 'Fish Curry', category: 'Non-Veg', region: 'North Indian', mealType: 'Lunch', calories: 180, protein: 20, carbs: 6, fiber: 1, fat: 8, servingSize: 100, tags: ['fish', 'coconut', 'curry', 'high-protein'] },
  { name: 'Fish Fry', category: 'Non-Veg', region: 'North Indian', mealType: 'Lunch', calories: 220, protein: 22, carbs: 4, fiber: 0, fat: 13, servingSize: 100, tags: ['fish', 'fried', 'spiced', 'high-protein'] },
  { name: 'Egg Curry', category: 'Non-Veg', region: 'North Indian', mealType: 'Lunch', calories: 200, protein: 14, carbs: 8, fiber: 2, fat: 13, servingSize: 100, tags: ['egg', 'onion', 'tomato', 'high-protein'] },
  { name: 'Keema Matar', category: 'Non-Veg', region: 'North Indian', mealType: 'Lunch', calories: 240, protein: 20, carbs: 10, fiber: 3, fat: 14, servingSize: 100, tags: ['minced meat', 'peas', 'high-protein'] },
  { name: 'Chicken Korma', category: 'Non-Veg', region: 'North Indian', mealType: 'Lunch', calories: 260, protein: 20, carbs: 8, fiber: 1, fat: 17, servingSize: 100, tags: ['chicken', 'cream', 'nuts', 'high-protein'] },
  { name: 'Prawn Masala', category: 'Non-Veg', region: 'North Indian', mealType: 'Lunch', calories: 160, protein: 18, carbs: 6, fiber: 1, fat: 7, servingSize: 100, tags: ['prawn', 'spiced', 'high-protein', 'low-carb'] },

  // SOUTH INDIAN - LUNCH/DINNER
  { name: 'Sambar Rice', category: 'Rice', region: 'South Indian', mealType: 'Lunch', calories: 180, protein: 6, carbs: 32, fiber: 3, fat: 3, servingSize: 100, tags: ['rice', 'lentil', 'vegetable', 'vegetarian'] },
  { name: 'Curd Rice', category: 'Rice', region: 'South Indian', mealType: 'Lunch', calories: 150, protein: 5, carbs: 26, fiber: 0, fat: 3, servingSize: 100, tags: ['rice', 'yogurt', 'cooling', 'vegetarian'] },
  { name: 'Lemon Rice', category: 'Rice', region: 'South Indian', mealType: 'Lunch', calories: 170, protein: 4, carbs: 30, fiber: 1, fat: 4, servingSize: 100, tags: ['rice', 'lemon', 'tempered', 'vegetarian'] },
  { name: 'Tamarind Rice (Pulihora)', category: 'Rice', region: 'South Indian', mealType: 'Lunch', calories: 180, protein: 4, carbs: 32, fiber: 1, fat: 4, servingSize: 100, tags: ['rice', 'tamarind', 'tangy', 'vegetarian'] },
  { name: 'Coconut Rice', category: 'Rice', region: 'South Indian', mealType: 'Lunch', calories: 190, protein: 4, carbs: 28, fiber: 2, fat: 7, servingSize: 100, tags: ['rice', 'coconut', 'vegetarian'] },
  { name: 'Rasam Rice', category: 'Rice', region: 'South Indian', mealType: 'Lunch', calories: 140, protein: 4, carbs: 28, fiber: 2, fat: 2, servingSize: 100, tags: ['rice', 'rasam', 'light', 'vegetarian'] },
  { name: 'Veg Kurma', category: 'Curry', region: 'South Indian', mealType: 'Lunch', calories: 160, protein: 5, carbs: 14, fiber: 3, fat: 10, servingSize: 100, tags: ['mixed vegetables', 'coconut', 'vegetarian'] },
  { name: 'Avial', category: 'Curry', region: 'South Indian', mealType: 'Lunch', calories: 130, protein: 5, carbs: 16, fiber: 4, fat: 5, servingSize: 100, tags: ['mixed vegetables', 'coconut', 'kerala', 'vegetarian'] },
  { name: 'Kootu', category: 'Curry', region: 'South Indian', mealType: 'Lunch', calories: 140, protein: 7, carbs: 18, fiber: 5, fat: 4, servingSize: 100, tags: ['vegetables', 'lentil', 'coconut', 'vegetarian'] },
  { name: 'Poriyal', category: 'Curry', region: 'South Indian', mealType: 'Lunch', calories: 100, protein: 4, carbs: 12, fiber: 3, fat: 5, servingSize: 100, tags: ['stir-fried', 'coconut', 'vegetarian'] },
  { name: 'Rasam', category: 'Soup', region: 'South Indian', mealType: 'Lunch', calories: 50, protein: 2, carbs: 8, fiber: 1, fat: 1, servingSize: 100, tags: ['tamarind', 'tomato', 'light', 'vegetarian', 'low-calorie'] },
  { name: 'Chicken Chettinad', category: 'Non-Veg', region: 'South Indian', mealType: 'Lunch', calories: 240, protein: 24, carbs: 6, fiber: 2, fat: 14, servingSize: 100, tags: ['chicken', 'spicy', 'tamil nadu', 'high-protein'] },
  { name: 'Fish Molee', category: 'Non-Veg', region: 'South Indian', mealType: 'Lunch', calories: 200, protein: 20, carbs: 6, fiber: 1, fat: 11, servingSize: 100, tags: ['fish', 'coconut', 'kerala', 'high-protein'] },
  { name: 'Hyderabadi Chicken Biryani', category: 'Non-Veg', region: 'South Indian', mealType: 'Lunch', calories: 280, protein: 18, carbs: 34, fiber: 2, fat: 9, servingSize: 100, tags: ['chicken', 'rice', 'hyderabadi', 'spiced', 'high-protein'] },
  { name: 'Mutton Biryani', category: 'Non-Veg', region: 'South Indian', mealType: 'Lunch', calories: 300, protein: 18, carbs: 34, fiber: 2, fat: 12, servingSize: 100, tags: ['mutton', 'rice', 'spiced', 'high-protein'] },
  { name: 'Egg Biryani', category: 'Non-Veg', region: 'South Indian', mealType: 'Lunch', calories: 240, protein: 14, carbs: 32, fiber: 2, fat: 8, servingSize: 100, tags: ['egg', 'rice', 'spiced', 'high-protein'] },

  // GUJARATI/WEST INDIAN - LUNCH/DINNER
  { name: 'Dal Dhokli', category: 'Combo', region: 'West Indian', mealType: 'Lunch', calories: 200, protein: 9, carbs: 30, fiber: 5, fat: 5, servingSize: 100, tags: ['lentil', 'wheat', 'gujarati', 'vegetarian'] },
  { name: 'Gujarati Kadhi', category: 'Dal', region: 'West Indian', mealType: 'Lunch', calories: 140, protein: 6, carbs: 16, fiber: 2, fat: 6, servingSize: 100, tags: ['yogurt', 'sweet', 'gujarati', 'vegetarian'] },
  { name: 'Undhiyu', category: 'Curry', region: 'West Indian', mealType: 'Lunch', calories: 180, protein: 6, carbs: 20, fiber: 6, fat: 9, servingSize: 100, tags: ['mixed vegetables', 'gujarati', 'winter', 'vegetarian', 'high-fiber'] },
  { name: 'Sev Tameta', category: 'Curry', region: 'West Indian', mealType: 'Lunch', calories: 160, protein: 5, carbs: 18, fiber: 3, fat: 8, servingSize: 100, tags: ['tomato', 'sev', 'gujarati', 'vegetarian'] },
  { name: 'Kadhi Khichdi', category: 'Combo', region: 'West Indian', mealType: 'Lunch', calories: 180, protein: 7, carbs: 28, fiber: 3, fat: 5, servingSize: 100, tags: ['rice', 'lentil', 'yogurt', 'gujarati', 'vegetarian'] },
  { name: 'Thepla', category: 'Bread', region: 'West Indian', mealType: 'Lunch', calories: 180, protein: 5, carbs: 26, fiber: 3, fat: 6, servingSize: 100, tags: ['wheat', 'spiced', 'gujarati', 'vegetarian'] },
  { name: 'Handvo', category: 'Snack', region: 'West Indian', mealType: 'Lunch', calories: 160, protein: 7, carbs: 22, fiber: 3, fat: 5, servingSize: 100, tags: ['lentil', 'rice', 'gujarati', 'vegetarian'] },

  // RAJASTHANI - LUNCH/DINNER
  { name: 'Dal Baati Churma', category: 'Combo', region: 'Rajasthani', mealType: 'Lunch', calories: 420, protein: 14, carbs: 52, fiber: 6, fat: 18, servingSize: 100, tags: ['lentil', 'wheat', 'ghee', 'rajasthani', 'vegetarian', 'high-protein'] },
  { name: 'Gatte Ki Sabzi', category: 'Curry', region: 'Rajasthani', mealType: 'Lunch', calories: 220, protein: 8, carbs: 18, fiber: 3, fat: 14, servingSize: 100, tags: ['gram flour', 'yogurt', 'rajasthani', 'vegetarian'] },
  { name: 'Ker Sangri', category: 'Curry', region: 'Rajasthani', mealType: 'Lunch', calories: 160, protein: 5, carbs: 16, fiber: 5, fat: 9, servingSize: 100, tags: ['desert beans', 'rajasthani', 'vegetarian', 'high-fiber'] },
  { name: 'Bajre Ki Roti with Lasun Chutney', category: 'Combo', region: 'Rajasthani', mealType: 'Lunch', calories: 220, protein: 7, carbs: 30, fiber: 5, fat: 8, servingSize: 100, tags: ['millet', 'garlic', 'rajasthani', 'vegetarian'] },
  { name: 'Laal Maas', category: 'Non-Veg', region: 'Rajasthani', mealType: 'Lunch', calories: 320, protein: 24, carbs: 4, fiber: 1, fat: 24, servingSize: 100, tags: ['mutton', 'spicy', 'rajasthani', 'high-protein'] },

  // BENGALI/EAST INDIAN - LUNCH/DINNER
  { name: 'Bengali Fish Curry (Macher Jhol)', category: 'Non-Veg', region: 'East Indian', mealType: 'Lunch', calories: 160, protein: 18, carbs: 4, fiber: 1, fat: 8, servingSize: 100, tags: ['fish', 'light', 'bengali', 'high-protein'] },
  { name: 'Shorshe Ilish', category: 'Non-Veg', region: 'East Indian', mealType: 'Lunch', calories: 240, protein: 22, carbs: 4, fiber: 1, fat: 16, servingSize: 100, tags: ['hilsa fish', 'mustard', 'bengali', 'high-protein'] },
  { name: 'Chingri Malai Curry', category: 'Non-Veg', region: 'East Indian', mealType: 'Lunch', calories: 200, protein: 16, carbs: 6, fiber: 1, fat: 12, servingSize: 100, tags: ['prawn', 'coconut', 'bengali', 'high-protein'] },
  { name: 'Kosha Mangsho', category: 'Non-Veg', region: 'East Indian', mealType: 'Lunch', calories: 280, protein: 22, carbs: 6, fiber: 2, fat: 18, servingSize: 100, tags: ['mutton', 'slow-cooked', 'bengali', 'high-protein'] },
  { name: 'Aloor Dum (Bengali)', category: 'Curry', region: 'East Indian', mealType: 'Lunch', calories: 160, protein: 4, carbs: 22, fiber: 3, fat: 6, servingSize: 100, tags: ['potato', 'spiced', 'bengali', 'vegetarian'] },
  { name: 'Shukto', category: 'Curry', region: 'East Indian', mealType: 'Lunch', calories: 120, protein: 5, carbs: 16, fiber: 4, fat: 4, servingSize: 100, tags: ['mixed vegetables', 'bitter', 'bengali', 'vegetarian'] },
  { name: 'Cholar Dal (Bengali)', category: 'Dal', region: 'East Indian', mealType: 'Lunch', calories: 160, protein: 10, carbs: 24, fiber: 7, fat: 3, servingSize: 100, tags: ['chickpeas', 'sweet', 'bengali', 'vegetarian', 'high-protein'] },
  { name: 'Bengali Khichuri', category: 'Rice', region: 'East Indian', mealType: 'Lunch', calories: 200, protein: 7, carbs: 32, fiber: 3, fat: 5, servingSize: 100, tags: ['rice', 'lentil', 'bengali', 'vegetarian'] },

  // SNACKS - NORTH INDIAN
  { name: 'Samosa (2 pieces)', category: 'Snack', region: 'North Indian', mealType: 'Snack', calories: 320, protein: 6, carbs: 36, fiber: 3, fat: 17, servingSize: 100, tags: ['potato', 'fried', 'pastry', 'vegetarian'] },
  { name: 'Pakora (Mixed, 4 pieces)', category: 'Snack', region: 'North Indian', mealType: 'Snack', calories: 240, protein: 6, carbs: 24, fiber: 3, fat: 14, servingSize: 100, tags: ['gram flour', 'vegetable', 'fried', 'vegetarian'] },
  { name: 'Aloo Tikki (2 pieces)', category: 'Snack', region: 'North Indian', mealType: 'Snack', calories: 200, protein: 5, carbs: 28, fiber: 3, fat: 8, servingSize: 100, tags: ['potato', 'fried', 'vegetarian'] },
  { name: 'Paneer Tikka', category: 'Snack', region: 'North Indian', mealType: 'Snack', calories: 220, protein: 16, carbs: 6, fiber: 1, fat: 14, servingSize: 100, tags: ['paneer', 'grilled', 'high-protein', 'vegetarian'] },
  { name: 'Hara Bhara Kebab', category: 'Snack', region: 'North Indian', mealType: 'Snack', calories: 160, protein: 7, carbs: 16, fiber: 5, fat: 8, servingSize: 100, tags: ['spinach', 'peas', 'vegetarian'] },
  { name: 'Veg Seekh Kebab', category: 'Snack', region: 'North Indian', mealType: 'Snack', calories: 180, protein: 9, carbs: 12, fiber: 3, fat: 11, servingSize: 100, tags: ['vegetable', 'spiced', 'grilled', 'vegetarian'] },
  { name: 'Dahi Bhalla', category: 'Snack', region: 'North Indian', mealType: 'Snack', calories: 200, protein: 7, carbs: 24, fiber: 2, fat: 9, servingSize: 100, tags: ['lentil', 'yogurt', 'chaat', 'vegetarian'] },
  { name: 'Aloo Chaat', category: 'Snack', region: 'North Indian', mealType: 'Snack', calories: 180, protein: 4, carbs: 26, fiber: 3, fat: 7, servingSize: 100, tags: ['potato', 'tangy', 'chaat', 'vegetarian'] },
  { name: 'Papdi Chaat', category: 'Snack', region: 'North Indian', mealType: 'Snack', calories: 220, protein: 6, carbs: 28, fiber: 2, fat: 10, servingSize: 100, tags: ['crispy', 'yogurt', 'chaat', 'vegetarian'] },
  { name: 'Bhel Puri', category: 'Snack', region: 'North Indian', mealType: 'Snack', calories: 160, protein: 5, carbs: 26, fiber: 2, fat: 4, servingSize: 100, tags: ['puffed rice', 'chaat', 'light', 'vegetarian'] },
  { name: 'Sev Puri', category: 'Snack', region: 'North Indian', mealType: 'Snack', calories: 180, protein: 4, carbs: 24, fiber: 2, fat: 8, servingSize: 100, tags: ['puri', 'sev', 'chaat', 'vegetarian'] },
  { name: 'Ragda Pattice', category: 'Snack', region: 'North Indian', mealType: 'Snack', calories: 220, protein: 8, carbs: 30, fiber: 5, fat: 8, servingSize: 100, tags: ['peas', 'potato', 'chaat', 'vegetarian'] },
  { name: 'Kachori', category: 'Snack', region: 'North Indian', mealType: 'Snack', calories: 260, protein: 7, carbs: 30, fiber: 3, fat: 13, servingSize: 100, tags: ['lentil', 'fried', 'spiced', 'vegetarian'] },
  { name: 'Mathri', category: 'Snack', region: 'North Indian', mealType: 'Snack', calories: 380, protein: 7, carbs: 44, fiber: 2, fat: 20, servingSize: 100, tags: ['wheat', 'fried', 'crispy', 'vegetarian'] },
  { name: 'Namkeen Mix', category: 'Snack', region: 'North Indian', mealType: 'Snack', calories: 420, protein: 10, carbs: 48, fiber: 4, fat: 22, servingSize: 100, tags: ['mixed', 'fried', 'savory', 'vegetarian'] },

  // SNACKS - SOUTH INDIAN
  { name: 'Mirchi Bajji (4 pieces)', category: 'Snack', region: 'South Indian', mealType: 'Snack', calories: 200, protein: 5, carbs: 22, fiber: 2, fat: 10, servingSize: 100, tags: ['chilli', 'gram flour', 'fried', 'vegetarian'] },
  { name: 'Mysore Bonda (4 pieces)', category: 'Snack', region: 'South Indian', mealType: 'Snack', calories: 240, protein: 6, carbs: 28, fiber: 1, fat: 12, servingSize: 100, tags: ['maida', 'fried', 'vegetarian'] },
  { name: 'Masala Vada', category: 'Snack', region: 'South Indian', mealType: 'Snack', calories: 260, protein: 8, carbs: 26, fiber: 3, fat: 14, servingSize: 100, tags: ['lentil', 'fried', 'spiced', 'vegetarian'] },
  { name: 'Banana Bajji', category: 'Snack', region: 'South Indian', mealType: 'Snack', calories: 220, protein: 4, carbs: 30, fiber: 2, fat: 10, servingSize: 100, tags: ['banana', 'gram flour', 'fried', 'vegetarian'] },
  { name: 'Murukku', category: 'Snack', region: 'South Indian', mealType: 'Snack', calories: 440, protein: 8, carbs: 50, fiber: 3, fat: 24, servingSize: 100, tags: ['rice', 'gram flour', 'fried', 'crispy', 'vegetarian'] },
  { name: 'Mixture', category: 'Snack', region: 'South Indian', mealType: 'Snack', calories: 420, protein: 10, carbs: 46, fiber: 4, fat: 22, servingSize: 100, tags: ['mixed', 'fried', 'savory', 'vegetarian'] },
  { name: 'Thengai Barfi', category: 'Snack', region: 'South Indian', mealType: 'Snack', calories: 380, protein: 6, carbs: 42, fiber: 2, fat: 22, servingSize: 100, tags: ['coconut', 'sweet', 'vegetarian'] },

  // SNACKS - WEST INDIAN
  { name: 'Vada Pav', category: 'Snack', region: 'West Indian', mealType: 'Snack', calories: 300, protein: 7, carbs: 38, fiber: 3, fat: 14, servingSize: 100, tags: ['potato', 'bread', 'fried', 'mumbai', 'vegetarian'] },
  { name: 'Pav Bhaji', category: 'Snack', region: 'West Indian', mealType: 'Snack', calories: 280, protein: 7, carbs: 36, fiber: 4, fat: 12, servingSize: 100, tags: ['mixed vegetables', 'bread', 'butter', 'mumbai', 'vegetarian'] },
  { name: 'Dabeli', category: 'Snack', region: 'West Indian', mealType: 'Snack', calories: 240, protein: 6, carbs: 34, fiber: 2, fat: 9, servingSize: 100, tags: ['potato', 'bread', 'gujarati', 'sweet-spicy', 'vegetarian'] },
  { name: 'Dhokla', category: 'Snack', region: 'West Indian', mealType: 'Snack', calories: 140, protein: 6, carbs: 22, fiber: 2, fat: 3, servingSize: 100, tags: ['gram flour', 'steamed', 'gujarati', 'vegetarian', 'light'] },
  { name: 'Khandvi', category: 'Snack', region: 'West Indian', mealType: 'Snack', calories: 160, protein: 6, carbs: 20, fiber: 2, fat: 6, servingSize: 100, tags: ['gram flour', 'rolled', 'gujarati', 'vegetarian'] },
  { name: 'Fafda', category: 'Snack', region: 'West Indian', mealType: 'Snack', calories: 380, protein: 12, carbs: 42, fiber: 3, fat: 18, servingSize: 100, tags: ['gram flour', 'fried', 'gujarati', 'vegetarian'] },
  { name: 'Khaman Dhokla', category: 'Snack', region: 'West Indian', mealType: 'Snack', calories: 150, protein: 7, carbs: 24, fiber: 2, fat: 3, servingSize: 100, tags: ['gram flour', 'steamed', 'gujarati', 'vegetarian', 'light'] },
  { name: 'Thepla with Chunda', category: 'Snack', region: 'West Indian', mealType: 'Snack', calories: 240, protein: 6, carbs: 34, fiber: 3, fat: 9, servingSize: 100, tags: ['wheat', 'mango pickle', 'gujarati', 'vegetarian'] },
  { name: 'Sev Usal', category: 'Snack', region: 'West Indian', mealType: 'Snack', calories: 220, protein: 9, carbs: 28, fiber: 5, fat: 9, servingSize: 100, tags: ['moth beans', 'sev', 'maharashtrian', 'vegetarian'] },

  // SNACKS - EAST INDIAN
  { name: 'Tele Bhaja (Mixed Fritters)', category: 'Snack', region: 'East Indian', mealType: 'Snack', calories: 260, protein: 5, carbs: 28, fiber: 2, fat: 14, servingSize: 100, tags: ['mixed', 'fried', 'bengali', 'vegetarian'] },
  { name: 'Beguni', category: 'Snack', region: 'East Indian', mealType: 'Snack', calories: 200, protein: 5, carbs: 22, fiber: 3, fat: 10, servingSize: 100, tags: ['eggplant', 'gram flour', 'fried', 'bengali', 'vegetarian'] },
  { name: 'Aloor Chop', category: 'Snack', region: 'East Indian', mealType: 'Snack', calories: 220, protein: 5, carbs: 26, fiber: 3, fat: 11, servingSize: 100, tags: ['potato', 'fried', 'bengali', 'vegetarian'] },
  { name: 'Ghugni', category: 'Snack', region: 'East Indian', mealType: 'Snack', calories: 160, protein: 9, carbs: 24, fiber: 6, fat: 3, servingSize: 100, tags: ['dried peas', 'spiced', 'bengali', 'vegetarian', 'high-protein'] },

  // SWEETS/DESSERTS
  { name: 'Gulab Jamun (2 pieces)', category: 'Sweet', region: 'North Indian', mealType: 'Snack', calories: 380, protein: 6, carbs: 52, fiber: 1, fat: 16, servingSize: 100, tags: ['milk', 'sugar', 'fried', 'sweet', 'vegetarian'] },
  { name: 'Rasgulla (2 pieces)', category: 'Sweet', region: 'East Indian', mealType: 'Snack', calories: 220, protein: 8, carbs: 36, fiber: 0, fat: 5, servingSize: 100, tags: ['paneer', 'sugar', 'bengali', 'sweet', 'vegetarian'] },
  { name: 'Rasmalai (2 pieces)', category: 'Sweet', region: 'East Indian', mealType: 'Snack', calories: 260, protein: 9, carbs: 32, fiber: 0, fat: 11, servingSize: 100, tags: ['paneer', 'milk', 'saffron', 'bengali', 'sweet', 'vegetarian'] },
  { name: 'Kaju Katli (2 pieces)', category: 'Sweet', region: 'North Indian', mealType: 'Snack', calories: 420, protein: 8, carbs: 48, fiber: 1, fat: 24, servingSize: 100, tags: ['cashew', 'sugar', 'sweet', 'vegetarian'] },
  { name: 'Barfi (2 pieces)', category: 'Sweet', region: 'North Indian', mealType: 'Snack', calories: 380, protein: 8, carbs: 44, fiber: 1, fat: 20, servingSize: 100, tags: ['milk', 'sugar', 'sweet', 'vegetarian'] },
  { name: 'Jalebi (4 pieces)', category: 'Sweet', region: 'North Indian', mealType: 'Snack', calories: 400, protein: 4, carbs: 62, fiber: 1, fat: 15, servingSize: 100, tags: ['maida', 'sugar', 'fried', 'sweet', 'vegetarian'] },
  { name: 'Ladoo (2 pieces)', category: 'Sweet', region: 'North Indian', mealType: 'Snack', calories: 360, protein: 8, carbs: 42, fiber: 2, fat: 18, servingSize: 100, tags: ['gram flour', 'ghee', 'sugar', 'sweet', 'vegetarian'] },
  { name: 'Motichoor Ladoo (2 pieces)', category: 'Sweet', region: 'North Indian', mealType: 'Snack', calories: 340, protein: 6, carbs: 46, fiber: 1, fat: 15, servingSize: 100, tags: ['gram flour', 'ghee', 'sugar', 'sweet', 'vegetarian'] },
  { name: 'Peda (2 pieces)', category: 'Sweet', region: 'North Indian', mealType: 'Snack', calories: 300, protein: 8, carbs: 38, fiber: 0, fat: 14, servingSize: 100, tags: ['milk', 'sugar', 'sweet', 'vegetarian'] },
  { name: 'Halwa (Gajar ka)', category: 'Sweet', region: 'North Indian', mealType: 'Snack', calories: 240, protein: 5, carbs: 32, fiber: 3, fat: 11, servingSize: 100, tags: ['carrot', 'milk', 'ghee', 'sweet', 'vegetarian'] },
  { name: 'Sooji Halwa', category: 'Sweet', region: 'North Indian', mealType: 'Snack', calories: 260, protein: 5, carbs: 38, fiber: 1, fat: 10, servingSize: 100, tags: ['semolina', 'ghee', 'sugar', 'sweet', 'vegetarian'] },
  { name: 'Payasam/Kheer', category: 'Sweet', region: 'North Indian', mealType: 'Snack', calories: 200, protein: 6, carbs: 30, fiber: 0, fat: 7, servingSize: 100, tags: ['rice', 'milk', 'sugar', 'sweet', 'vegetarian'] },
  { name: 'Sandesh', category: 'Sweet', region: 'East Indian', mealType: 'Snack', calories: 220, protein: 10, carbs: 28, fiber: 0, fat: 8, servingSize: 100, tags: ['paneer', 'sugar', 'bengali', 'sweet', 'vegetarian'] },
  { name: 'Mishti Doi', category: 'Sweet', region: 'East Indian', mealType: 'Snack', calories: 140, protein: 5, carbs: 22, fiber: 0, fat: 4, servingSize: 100, tags: ['yogurt', 'caramel', 'bengali', 'sweet', 'vegetarian'] },
  { name: 'Shrikhand', category: 'Sweet', region: 'West Indian', mealType: 'Snack', calories: 220, protein: 7, carbs: 28, fiber: 0, fat: 10, servingSize: 100, tags: ['yogurt', 'sugar', 'gujarati', 'sweet', 'vegetarian'] },
  { name: 'Basundi', category: 'Sweet', region: 'West Indian', mealType: 'Snack', calories: 240, protein: 7, carbs: 30, fiber: 0, fat: 11, servingSize: 100, tags: ['milk', 'sugar', 'nuts', 'sweet', 'vegetarian'] },
  { name: 'Modak', category: 'Sweet', region: 'West Indian', mealType: 'Snack', calories: 200, protein: 4, carbs: 34, fiber: 1, fat: 6, servingSize: 100, tags: ['rice flour', 'coconut', 'jaggery', 'maharashtrian', 'sweet', 'vegetarian'] },
  { name: 'Puran Poli', category: 'Sweet', region: 'West Indian', mealType: 'Snack', calories: 280, protein: 7, carbs: 42, fiber: 4, fat: 9, servingSize: 100, tags: ['wheat', 'lentil', 'jaggery', 'maharashtrian', 'sweet', 'vegetarian'] },
  { name: 'Mysore Pak', category: 'Sweet', region: 'South Indian', mealType: 'Snack', calories: 460, protein: 6, carbs: 44, fiber: 1, fat: 30, servingSize: 100, tags: ['gram flour', 'ghee', 'sugar', 'sweet', 'vegetarian'] },
  { name: 'Pongal (Sweet)', category: 'Sweet', region: 'South Indian', mealType: 'Snack', calories: 240, protein: 5, carbs: 38, fiber: 1, fat: 8, servingSize: 100, tags: ['rice', 'moong', 'jaggery', 'ghee', 'sweet', 'vegetarian'] },

  // BEVERAGES
  { name: 'Masala Chai', category: 'Beverage', region: 'North Indian', mealType: 'Snack', calories: 80, protein: 3, carbs: 12, fiber: 0, fat: 2, servingSize: 100, tags: ['tea', 'milk', 'spiced', 'vegetarian'] },
  { name: 'Cutting Chai', category: 'Beverage', region: 'West Indian', mealType: 'Snack', calories: 60, protein: 2, carbs: 9, fiber: 0, fat: 2, servingSize: 100, tags: ['tea', 'milk', 'mumbai', 'vegetarian'] },
  { name: 'Filter Coffee', category: 'Beverage', region: 'South Indian', mealType: 'Snack', calories: 90, protein: 3, carbs: 14, fiber: 0, fat: 2, servingSize: 100, tags: ['coffee', 'milk', 'south indian', 'vegetarian'] },
  { name: 'Lassi (Sweet)', category: 'Beverage', region: 'North Indian', mealType: 'Snack', calories: 120, protein: 4, carbs: 18, fiber: 0, fat: 4, servingSize: 100, tags: ['yogurt', 'sugar', 'punjabi', 'vegetarian'] },
  { name: 'Lassi (Salted)', category: 'Beverage', region: 'North Indian', mealType: 'Snack', calories: 80, protein: 4, carbs: 8, fiber: 0, fat: 4, servingSize: 100, tags: ['yogurt', 'salt', 'punjabi', 'vegetarian'] },
  { name: 'Mango Lassi', category: 'Beverage', region: 'North Indian', mealType: 'Snack', calories: 140, protein: 4, carbs: 24, fiber: 1, fat: 3, servingSize: 100, tags: ['yogurt', 'mango', 'sweet', 'vegetarian'] },
  { name: 'Chaas/Buttermilk', category: 'Beverage', region: 'North Indian', mealType: 'Snack', calories: 40, protein: 3, carbs: 4, fiber: 0, fat: 1, servingSize: 100, tags: ['yogurt', 'spiced', 'light', 'vegetarian', 'low-calorie'] },
  { name: 'Nimbu Pani', category: 'Beverage', region: 'North Indian', mealType: 'Snack', calories: 60, protein: 0, carbs: 15, fiber: 0, fat: 0, servingSize: 100, tags: ['lemon', 'sugar', 'refreshing', 'vegetarian', 'low-calorie'] },
  { name: 'Aam Panna', category: 'Beverage', region: 'North Indian', mealType: 'Snack', calories: 80, protein: 1, carbs: 19, fiber: 0, fat: 0, servingSize: 100, tags: ['raw mango', 'summer', 'cooling', 'vegetarian'] },
  { name: 'Jaljeera', category: 'Beverage', region: 'North Indian', mealType: 'Snack', calories: 30, protein: 1, carbs: 7, fiber: 0, fat: 0, servingSize: 100, tags: ['cumin', 'mint', 'digestive', 'vegetarian', 'low-calorie'] },
  { name: 'Thandai', category: 'Beverage', region: 'North Indian', mealType: 'Snack', calories: 160, protein: 5, carbs: 20, fiber: 1, fat: 7, servingSize: 100, tags: ['milk', 'nuts', 'spiced', 'festival', 'vegetarian'] },
  { name: 'Coconut Water', category: 'Beverage', region: 'South Indian', mealType: 'Snack', calories: 20, protein: 1, carbs: 4, fiber: 0, fat: 0, servingSize: 100, tags: ['coconut', 'natural', 'electrolyte', 'vegetarian', 'low-calorie'] },
  { name: 'Badam Milk', category: 'Beverage', region: 'South Indian', mealType: 'Snack', calories: 140, protein: 5, carbs: 18, fiber: 1, fat: 6, servingSize: 100, tags: ['milk', 'almond', 'sweet', 'vegetarian'] },

  // SALADS/RATIAS
  { name: 'Kachumber Salad', category: 'Salad', region: 'North Indian', mealType: 'Lunch', calories: 40, protein: 2, carbs: 8, fiber: 3, fat: 0, servingSize: 100, tags: ['cucumber', 'tomato', 'onion', 'fresh', 'vegetarian', 'low-calorie'] },
  { name: 'Sprouts Salad', category: 'Salad', region: 'North Indian', mealType: 'Snack', calories: 100, protein: 8, carbs: 16, fiber: 6, fat: 1, servingSize: 100, tags: ['sprouts', 'lemon', 'onion', 'vegetarian', 'high-protein', 'high-fiber'] },
  { name: 'Fruit Chaat', category: 'Salad', region: 'North Indian', mealType: 'Snack', calories: 80, protein: 1, carbs: 18, fiber: 2, fat: 0, servingSize: 100, tags: ['mixed fruit', 'chaat masala', 'vegetarian', 'low-fat'] },

  // PICKLES/ACCOMPANIMENTS
  { name: 'Achar (Mixed Pickle)', category: 'Accompaniment', region: 'North Indian', mealType: 'Lunch', calories: 180, protein: 2, carbs: 10, fiber: 2, fat: 15, servingSize: 100, tags: ['mixed', 'oil', 'spiced', 'vegetarian'] },
  { name: 'Mango Pickle', category: 'Accompaniment', region: 'North Indian', mealType: 'Lunch', calories: 160, protein: 2, carbs: 12, fiber: 2, fat: 12, servingSize: 100, tags: ['mango', 'oil', 'spiced', 'vegetarian'] },
  { name: 'Raita (Boondi)', category: 'Accompaniment', region: 'North Indian', mealType: 'Lunch', calories: 80, protein: 3, carbs: 10, fiber: 0, fat: 3, servingSize: 100, tags: ['yogurt', 'boondi', 'cooling', 'vegetarian'] },
  { name: 'Raita (Cucumber)', category: 'Accompaniment', region: 'North Indian', mealType: 'Lunch', calories: 50, protein: 3, carbs: 6, fiber: 1, fat: 2, servingSize: 100, tags: ['yogurt', 'cucumber', 'cooling', 'vegetarian', 'low-calorie'] },
  { name: 'Raita (Onion)', category: 'Accompaniment', region: 'North Indian', mealType: 'Lunch', calories: 60, protein: 3, carbs: 8, fiber: 1, fat: 2, servingSize: 100, tags: ['yogurt', 'onion', 'cooling', 'vegetarian'] },
  { name: 'Papad', category: 'Accompaniment', region: 'North Indian', mealType: 'Lunch', calories: 340, protein: 12, carbs: 56, fiber: 3, fat: 6, servingSize: 100, tags: ['lentil', 'crispy', 'vegetarian'] },
  { name: 'Fried Papad', category: 'Accompaniment', region: 'North Indian', mealType: 'Lunch', calories: 520, protein: 12, carbs: 52, fiber: 3, fat: 30, servingSize: 100, tags: ['lentil', 'fried', 'crispy', 'vegetarian'] },

  // SOUTH INDIAN - SPECIAL
  { name: 'Chicken 65', category: 'Non-Veg', region: 'South Indian', mealType: 'Snack', calories: 240, protein: 22, carbs: 10, fiber: 1, fat: 13, servingSize: 100, tags: ['chicken', 'fried', 'spicy', 'high-protein'] },
  { name: 'Egg Biryani (Hyderabadi)', category: 'Non-Veg', region: 'South Indian', mealType: 'Lunch', calories: 240, protein: 14, carbs: 32, fiber: 2, fat: 8, servingSize: 100, tags: ['egg', 'rice', 'hyderabadi', 'spiced', 'high-protein'] },
  { name: 'Pesarattu Upma', category: 'Combo', region: 'South Indian', mealType: 'Breakfast', calories: 200, protein: 10, carbs: 30, fiber: 4, fat: 5, servingSize: 100, tags: ['moong', 'semolina', 'combo', 'vegetarian', 'high-protein'] },
  { name: 'Gongura Pachadi', category: 'Accompaniment', region: 'South Indian', mealType: 'Lunch', calories: 100, protein: 3, carbs: 8, fiber: 3, fat: 7, servingSize: 100, tags: ['sorrel leaves', 'tangy', 'andhra', 'vegetarian'] },
  { name: 'Avakaya (Mango Pickle)', category: 'Accompaniment', region: 'South Indian', mealType: 'Lunch', calories: 180, protein: 2, carbs: 10, fiber: 2, fat: 15, servingSize: 100, tags: ['mango', 'mustard', 'andhra', 'vegetarian'] },

  // STREET FOOD
  { name: 'Pani Puri (6 pieces)', category: 'Street Food', region: 'North Indian', mealType: 'Snack', calories: 160, protein: 4, carbs: 24, fiber: 2, fat: 5, servingSize: 100, tags: ['crispy', 'spiced water', 'chaat', 'vegetarian'] },
  { name: 'Golgappa (6 pieces)', category: 'Street Food', region: 'North Indian', mealType: 'Snack', calories: 160, protein: 4, carbs: 24, fiber: 2, fat: 5, servingSize: 100, tags: ['crispy', 'spiced water', 'chaat', 'vegetarian'] },
  { name: 'Dahi Puri (6 pieces)', category: 'Street Food', region: 'North Indian', mealType: 'Snack', calories: 200, protein: 5, carbs: 28, fiber: 2, fat: 8, servingSize: 100, tags: ['crispy', 'yogurt', 'chaat', 'vegetarian'] },
  { name: 'Raj Kachori', category: 'Street Food', region: 'North Indian', mealType: 'Snack', calories: 280, protein: 8, carbs: 32, fiber: 4, fat: 14, servingSize: 100, tags: ['large', 'stuffed', 'chaat', 'vegetarian'] },
  { name: 'Aloo Kulcha with Chole', category: 'Street Food', region: 'North Indian', mealType: 'Lunch', calories: 380, protein: 12, carbs: 50, fiber: 6, fat: 14, servingSize: 100, tags: ['stuffed bread', 'chickpeas', 'punjabi', 'vegetarian'] },
  { name: 'Momos (Veg, 6 pieces)', category: 'Street Food', region: 'North Indian', mealType: 'Snack', calories: 180, protein: 6, carbs: 28, fiber: 3, fat: 5, servingSize: 100, tags: ['steamed', 'vegetable', 'tibetan', 'vegetarian'] },
  { name: 'Momos (Chicken, 6 pieces)', category: 'Street Food', region: 'North Indian', mealType: 'Snack', calories: 220, protein: 16, carbs: 24, fiber: 2, fat: 6, servingSize: 100, tags: ['steamed', 'chicken', 'tibetan', 'high-protein'] },
  { name: 'Frankie/Veg Roll', category: 'Street Food', region: 'West Indian', mealType: 'Snack', calories: 260, protein: 8, carbs: 32, fiber: 3, fat: 11, servingSize: 100, tags: ['wrap', 'vegetable', 'mumbai', 'vegetarian'] },
  { name: 'Egg Roll', category: 'Street Food', region: 'East Indian', mealType: 'Snack', calories: 280, protein: 12, carbs: 30, fiber: 2, fat: 13, servingSize: 100, tags: ['wrap', 'egg', 'kolkata', 'high-protein'] },
  { name: 'Kathi Roll (Chicken)', category: 'Street Food', region: 'East Indian', mealType: 'Snack', calories: 300, protein: 18, carbs: 28, fiber: 2, fat: 14, servingSize: 100, tags: ['wrap', 'chicken', 'kolkata', 'high-protein'] },

  // CONTINENTAL/INDO-CHINESE
  { name: 'Veg Manchurian (Dry)', category: 'Indo-Chinese', region: 'North Indian', mealType: 'Snack', calories: 200, protein: 6, carbs: 24, fiber: 3, fat: 9, servingSize: 100, tags: ['vegetable', 'fried', 'spiced', 'vegetarian'] },
  { name: 'Gobi Manchurian', category: 'Indo-Chinese', region: 'North Indian', mealType: 'Snack', calories: 220, protein: 5, carbs: 26, fiber: 3, fat: 11, servingSize: 100, tags: ['cauliflower', 'fried', 'spiced', 'vegetarian'] },
  { name: 'Veg Fried Rice', category: 'Indo-Chinese', region: 'North Indian', mealType: 'Lunch', calories: 180, protein: 5, carbs: 30, fiber: 2, fat: 5, servingSize: 100, tags: ['rice', 'vegetable', 'vegetarian'] },
  { name: 'Egg Fried Rice', category: 'Indo-Chinese', region: 'North Indian', mealType: 'Lunch', calories: 200, protein: 8, carbs: 28, fiber: 1, fat: 7, servingSize: 100, tags: ['rice', 'egg', 'high-protein'] },
  { name: 'Chicken Fried Rice', category: 'Indo-Chinese', region: 'North Indian', mealType: 'Lunch', calories: 220, protein: 14, carbs: 28, fiber: 1, fat: 7, servingSize: 100, tags: ['rice', 'chicken', 'high-protein'] },
  { name: 'Hakka Noodles (Veg)', category: 'Indo-Chinese', region: 'North Indian', mealType: 'Lunch', calories: 180, protein: 5, carbs: 30, fiber: 2, fat: 5, servingSize: 100, tags: ['noodles', 'vegetable', 'vegetarian'] },
  { name: 'Chilli Chicken', category: 'Indo-Chinese', region: 'North Indian', mealType: 'Snack', calories: 240, protein: 20, carbs: 12, fiber: 1, fat: 12, servingSize: 100, tags: ['chicken', 'spicy', 'high-protein'] },
  { name: 'Paneer Chilli', category: 'Indo-Chinese', region: 'North Indian', mealType: 'Snack', calories: 240, protein: 14, carbs: 14, fiber: 2, fat: 15, servingSize: 100, tags: ['paneer', 'spicy', 'vegetarian', 'high-protein'] },
  { name: 'Schezwan Noodles', category: 'Indo-Chinese', region: 'North Indian', mealType: 'Lunch', calories: 200, protein: 6, carbs: 32, fiber: 2, fat: 6, servingSize: 100, tags: ['noodles', 'spicy', 'vegetarian'] },

  // NUTS & DRIED FRUITS
  { name: 'Cashews (Kaju)', category: 'Nuts', region: 'Indian', mealType: 'Snack', calories: 553, protein: 18, carbs: 30, fiber: 3, fat: 44, servingSize: 100, tags: ['cashew', 'nuts', 'high-protein', 'high-fat', 'vegetarian'] },
  { name: 'Almonds (Badam)', category: 'Nuts', region: 'Indian', mealType: 'Snack', calories: 579, protein: 21, carbs: 22, fiber: 12, fat: 50, servingSize: 100, tags: ['almond', 'nuts', 'high-protein', 'high-fiber', 'vegetarian'] },
  { name: 'Walnuts (Akhrot)', category: 'Nuts', region: 'Indian', mealType: 'Snack', calories: 654, protein: 15, carbs: 14, fiber: 7, fat: 65, servingSize: 100, tags: ['walnut', 'nuts', 'omega-3', 'vegetarian'] },
  { name: 'Peanuts (Moongfali)', category: 'Nuts', region: 'Indian', mealType: 'Snack', calories: 567, protein: 26, carbs: 16, fiber: 8, fat: 49, servingSize: 100, tags: ['peanut', 'nuts', 'high-protein', 'vegetarian'] },
  { name: 'Pistachios (Pista)', category: 'Nuts', region: 'Indian', mealType: 'Snack', calories: 560, protein: 20, carbs: 28, fiber: 10, fat: 45, servingSize: 100, tags: ['pistachio', 'nuts', 'high-protein', 'vegetarian'] },
  { name: 'Dates (Khajoor)', category: 'Dried Fruit', region: 'Indian', mealType: 'Snack', calories: 277, protein: 2, carbs: 75, fiber: 7, fat: 0, servingSize: 100, tags: ['dates', 'dried fruit', 'sweet', 'high-fiber', 'vegetarian', 'energy'] },
  { name: 'Raisins (Kishmish)', category: 'Dried Fruit', region: 'Indian', mealType: 'Snack', calories: 299, protein: 3, carbs: 79, fiber: 4, fat: 0, servingSize: 100, tags: ['raisins', 'dried fruit', 'sweet', 'vegetarian'] },
  { name: 'Figs (Anjeer)', category: 'Dried Fruit', region: 'Indian', mealType: 'Snack', calories: 249, protein: 3, carbs: 64, fiber: 10, fat: 1, servingSize: 100, tags: ['figs', 'dried fruit', 'high-fiber', 'vegetarian'] },
  { name: 'Dried Apricots', category: 'Dried Fruit', region: 'Indian', mealType: 'Snack', calories: 241, protein: 3, carbs: 63, fiber: 7, fat: 1, servingSize: 100, tags: ['apricot', 'dried fruit', 'vegetarian'] },
  { name: 'Mixed Dry Fruits', category: 'Dried Fruit', region: 'Indian', mealType: 'Snack', calories: 520, protein: 14, carbs: 45, fiber: 6, fat: 35, servingSize: 100, tags: ['mixed', 'nuts', 'dried fruit', 'vegetarian', 'energy'] },
  { name: 'Coconut (Dry)', category: 'Nuts', region: 'Indian', mealType: 'Snack', calories: 354, protein: 3, carbs: 15, fiber: 9, fat: 34, servingSize: 100, tags: ['coconut', 'dried', 'vegetarian'] },
  { name: 'Pumpkin Seeds', category: 'Seeds', region: 'Indian', mealType: 'Snack', calories: 559, protein: 30, carbs: 11, fiber: 6, fat: 49, servingSize: 100, tags: ['seeds', 'high-protein', 'vegetarian'] },
  { name: 'Sunflower Seeds', category: 'Seeds', region: 'Indian', mealType: 'Snack', calories: 584, protein: 21, carbs: 20, fiber: 9, fat: 51, servingSize: 100, tags: ['seeds', 'high-protein', 'vegetarian'] },
  { name: 'Chia Seeds', category: 'Seeds', region: 'Indian', mealType: 'Snack', calories: 486, protein: 17, carbs: 42, fiber: 34, fat: 31, servingSize: 100, tags: ['seeds', 'high-fiber', 'omega-3', 'vegetarian'] },
  { name: 'Flax Seeds (Alsi)', category: 'Seeds', region: 'Indian', mealType: 'Snack', calories: 534, protein: 18, carbs: 29, fiber: 27, fat: 42, servingSize: 100, tags: ['seeds', 'high-fiber', 'omega-3', 'vegetarian'] },
  { name: 'Melon Seeds (Magaz)', category: 'Seeds', region: 'Indian', mealType: 'Snack', calories: 550, protein: 28, carbs: 15, fiber: 4, fat: 47, servingSize: 100, tags: ['seeds', 'high-protein', 'vegetarian'] },

  // FRUITS
  { name: 'Banana', category: 'Fruit', region: 'Indian', mealType: 'Snack', calories: 89, protein: 1, carbs: 23, fiber: 3, fat: 0, servingSize: 100, tags: ['banana', 'fruit', 'potassium', 'vegetarian', 'low-fat'] },
  { name: 'Apple', category: 'Fruit', region: 'Indian', mealType: 'Snack', calories: 52, protein: 0, carbs: 14, fiber: 2, fat: 0, servingSize: 100, tags: ['apple', 'fruit', 'vegetarian', 'low-calorie'] },
  { name: 'Mango', category: 'Fruit', region: 'Indian', mealType: 'Snack', calories: 60, protein: 1, carbs: 15, fiber: 2, fat: 0, servingSize: 100, tags: ['mango', 'fruit', 'sweet', 'vegetarian'] },
  { name: 'Guava', category: 'Fruit', region: 'Indian', mealType: 'Snack', calories: 68, protein: 3, carbs: 14, fiber: 5, fat: 1, servingSize: 100, tags: ['guava', 'fruit', 'high-fiber', 'vitamin-c', 'vegetarian'] },
  { name: 'Papaya', category: 'Fruit', region: 'Indian', mealType: 'Snack', calories: 43, protein: 1, carbs: 11, fiber: 2, fat: 0, servingSize: 100, tags: ['papaya', 'fruit', 'low-calorie', 'vegetarian'] },
  { name: 'Orange', category: 'Fruit', region: 'Indian', mealType: 'Snack', calories: 47, protein: 1, carbs: 12, fiber: 2, fat: 0, servingSize: 100, tags: ['orange', 'fruit', 'vitamin-c', 'vegetarian'] },
  { name: 'Watermelon', category: 'Fruit', region: 'Indian', mealType: 'Snack', calories: 30, protein: 1, carbs: 8, fiber: 0, fat: 0, servingSize: 100, tags: ['watermelon', 'fruit', 'low-calorie', 'hydrating', 'vegetarian'] },
  { name: 'Grapes', category: 'Fruit', region: 'Indian', mealType: 'Snack', calories: 69, protein: 1, carbs: 18, fiber: 1, fat: 0, servingSize: 100, tags: ['grapes', 'fruit', 'sweet', 'vegetarian'] },
  { name: 'Pomegranate (Anar)', category: 'Fruit', region: 'Indian', mealType: 'Snack', calories: 83, protein: 2, carbs: 19, fiber: 4, fat: 1, servingSize: 100, tags: ['pomegranate', 'fruit', 'antioxidant', 'vegetarian'] },
  { name: 'Chikoo (Sapodilla)', category: 'Fruit', region: 'Indian', mealType: 'Snack', calories: 83, protein: 0, carbs: 20, fiber: 5, fat: 1, servingSize: 100, tags: ['chikoo', 'fruit', 'sweet', 'vegetarian'] },
  { name: 'Jackfruit', category: 'Fruit', region: 'Indian', mealType: 'Snack', calories: 95, protein: 2, carbs: 23, fiber: 2, fat: 1, servingSize: 100, tags: ['jackfruit', 'fruit', 'tropical', 'vegetarian'] },
  { name: 'Lychee (Litchi)', category: 'Fruit', region: 'Indian', mealType: 'Snack', calories: 66, protein: 1, carbs: 17, fiber: 1, fat: 0, servingSize: 100, tags: ['lychee', 'fruit', 'sweet', 'vegetarian'] },
  { name: 'Muskmelon', category: 'Fruit', region: 'Indian', mealType: 'Snack', calories: 34, protein: 1, carbs: 8, fiber: 1, fat: 0, servingSize: 100, tags: ['muskmelon', 'fruit', 'low-calorie', 'vegetarian'] },

  // VEGETABLES
  { name: 'Potato (Aloo)', category: 'Vegetable', region: 'Indian', mealType: 'Lunch', calories: 77, protein: 2, carbs: 17, fiber: 2, fat: 0, servingSize: 100, tags: ['potato', 'vegetable', 'staple', 'vegetarian'] },
  { name: 'Tomato', category: 'Vegetable', region: 'Indian', mealType: 'Lunch', calories: 18, protein: 1, carbs: 4, fiber: 1, fat: 0, servingSize: 100, tags: ['tomato', 'vegetable', 'low-calorie', 'vegetarian'] },
  { name: 'Onion', category: 'Vegetable', region: 'Indian', mealType: 'Lunch', calories: 40, protein: 1, carbs: 9, fiber: 2, fat: 0, servingSize: 100, tags: ['onion', 'vegetable', 'vegetarian'] },
  { name: 'Spinach (Palak)', category: 'Vegetable', region: 'Indian', mealType: 'Lunch', calories: 23, protein: 3, carbs: 4, fiber: 2, fat: 0, servingSize: 100, tags: ['spinach', 'vegetable', 'iron', 'low-calorie', 'vegetarian'] },
  { name: 'Cauliflower (Gobi)', category: 'Vegetable', region: 'Indian', mealType: 'Lunch', calories: 25, protein: 2, carbs: 5, fiber: 2, fat: 0, servingSize: 100, tags: ['cauliflower', 'vegetable', 'low-calorie', 'vegetarian'] },
  { name: 'Cabbage (Patta Gobi)', category: 'Vegetable', region: 'Indian', mealType: 'Lunch', calories: 25, protein: 1, carbs: 6, fiber: 3, fat: 0, servingSize: 100, tags: ['cabbage', 'vegetable', 'low-calorie', 'vegetarian'] },
  { name: 'Carrot (Gajar)', category: 'Vegetable', region: 'Indian', mealType: 'Lunch', calories: 41, protein: 1, carbs: 10, fiber: 3, fat: 0, servingSize: 100, tags: ['carrot', 'vegetable', 'vitamin-a', 'vegetarian'] },
  { name: 'Green Peas (Matar)', category: 'Vegetable', region: 'Indian', mealType: 'Lunch', calories: 81, protein: 5, carbs: 14, fiber: 5, fat: 0, servingSize: 100, tags: ['peas', 'vegetable', 'high-protein', 'vegetarian'] },
  { name: 'Beans (French Beans)', category: 'Vegetable', region: 'Indian', mealType: 'Lunch', calories: 31, protein: 2, carbs: 7, fiber: 3, fat: 0, servingSize: 100, tags: ['beans', 'vegetable', 'low-calorie', 'vegetarian'] },
  { name: 'Brinjal (Baingan)', category: 'Vegetable', region: 'Indian', mealType: 'Lunch', calories: 25, protein: 1, carbs: 6, fiber: 3, fat: 0, servingSize: 100, tags: ['brinjal', 'eggplant', 'vegetable', 'low-calorie', 'vegetarian'] },
  { name: 'Okra (Bhindi)', category: 'Vegetable', region: 'Indian', mealType: 'Lunch', calories: 33, protein: 2, carbs: 7, fiber: 3, fat: 0, servingSize: 100, tags: ['okra', 'bhindi', 'vegetable', 'vegetarian'] },
  { name: 'Capsicum (Shimla Mirch)', category: 'Vegetable', region: 'Indian', mealType: 'Lunch', calories: 20, protein: 1, carbs: 5, fiber: 2, fat: 0, servingSize: 100, tags: ['capsicum', 'bell pepper', 'vegetable', 'low-calorie', 'vegetarian'] },
  { name: 'Bottle Gourd (Lauki)', category: 'Vegetable', region: 'Indian', mealType: 'Lunch', calories: 15, protein: 1, carbs: 3, fiber: 1, fat: 0, servingSize: 100, tags: ['bottle gourd', 'lauki', 'vegetable', 'low-calorie', 'vegetarian'] },
  { name: 'Bitter Gourd (Karela)', category: 'Vegetable', region: 'Indian', mealType: 'Lunch', calories: 17, protein: 1, carbs: 4, fiber: 3, fat: 0, servingSize: 100, tags: ['bitter gourd', 'karela', 'vegetable', 'low-calorie', 'vegetarian'] },
  { name: 'Ridge Gourd (Turai)', category: 'Vegetable', region: 'Indian', mealType: 'Lunch', calories: 20, protein: 1, carbs: 4, fiber: 2, fat: 0, servingSize: 100, tags: ['ridge gourd', 'turai', 'vegetable', 'low-calorie', 'vegetarian'] },
  { name: 'Sweet Potato (Shakarkandi)', category: 'Vegetable', region: 'Indian', mealType: 'Snack', calories: 86, protein: 2, carbs: 20, fiber: 3, fat: 0, servingSize: 100, tags: ['sweet potato', 'vegetable', 'complex-carbs', 'vegetarian'] },
  { name: 'Corn (Makka)', category: 'Vegetable', region: 'Indian', mealType: 'Snack', calories: 86, protein: 3, carbs: 19, fiber: 2, fat: 1, servingSize: 100, tags: ['corn', 'vegetable', 'vegetarian'] },
  { name: 'Mushroom', category: 'Vegetable', region: 'Indian', mealType: 'Lunch', calories: 22, protein: 3, carbs: 3, fiber: 1, fat: 0, servingSize: 100, tags: ['mushroom', 'vegetable', 'low-calorie', 'vegetarian'] },
  { name: 'Broccoli', category: 'Vegetable', region: 'Indian', mealType: 'Lunch', calories: 34, protein: 3, carbs: 7, fiber: 3, fat: 0, servingSize: 100, tags: ['broccoli', 'vegetable', 'high-fiber', 'vegetarian'] },
  { name: 'Cucumber (Kheera)', category: 'Vegetable', region: 'Indian', mealType: 'Snack', calories: 15, protein: 1, carbs: 4, fiber: 1, fat: 0, servingSize: 100, tags: ['cucumber', 'vegetable', 'low-calorie', 'hydrating', 'vegetarian'] },
  { name: 'Radish (Mooli)', category: 'Vegetable', region: 'Indian', mealType: 'Lunch', calories: 16, protein: 1, carbs: 3, fiber: 2, fat: 0, servingSize: 100, tags: ['radish', 'mooli', 'vegetable', 'low-calorie', 'vegetarian'] },
  { name: 'Pumpkin (Kaddu)', category: 'Vegetable', region: 'Indian', mealType: 'Lunch', calories: 26, protein: 1, carbs: 7, fiber: 1, fat: 0, servingSize: 100, tags: ['pumpkin', 'kaddu', 'vegetable', 'low-calorie', 'vegetarian'] },
  { name: 'Fenugreek Leaves (Methi)', category: 'Vegetable', region: 'Indian', mealType: 'Lunch', calories: 49, protein: 4, carbs: 6, fiber: 4, fat: 1, servingSize: 100, tags: ['fenugreek', 'methi', 'vegetable', 'iron', 'vegetarian'] },
  { name: 'Amaranth Leaves (Chaulai)', category: 'Vegetable', region: 'Indian', mealType: 'Lunch', calories: 23, protein: 2, carbs: 4, fiber: 2, fat: 0, servingSize: 100, tags: ['amaranth', 'chaulai', 'vegetable', 'iron', 'vegetarian'] },

  // DAIRY
  { name: 'Milk (Full Cream)', category: 'Dairy', region: 'Indian', mealType: 'Snack', calories: 61, protein: 3, carbs: 5, fiber: 0, fat: 3, servingSize: 100, tags: ['milk', 'dairy', 'calcium', 'vegetarian'] },
  { name: 'Milk (Toned)', category: 'Dairy', region: 'Indian', mealType: 'Snack', calories: 47, protein: 3, carbs: 5, fiber: 0, fat: 1, servingSize: 100, tags: ['milk', 'dairy', 'calcium', 'low-fat', 'vegetarian'] },
  { name: 'Curd (Dahi)', category: 'Dairy', region: 'Indian', mealType: 'Snack', calories: 60, protein: 3, carbs: 4, fiber: 0, fat: 3, servingSize: 100, tags: ['curd', 'yogurt', 'dairy', 'probiotic', 'vegetarian'] },
  { name: 'Paneer', category: 'Dairy', region: 'Indian', mealType: 'Lunch', calories: 265, protein: 18, carbs: 1, fiber: 0, fat: 21, servingSize: 100, tags: ['paneer', 'cottage cheese', 'dairy', 'high-protein', 'vegetarian'] },
  { name: 'Ghee', category: 'Dairy', region: 'Indian', mealType: 'Lunch', calories: 900, protein: 0, carbs: 0, fiber: 0, fat: 100, servingSize: 100, tags: ['ghee', 'clarified butter', 'dairy', 'high-fat'] },
  { name: 'Butter', category: 'Dairy', region: 'Indian', mealType: 'Lunch', calories: 717, protein: 1, carbs: 0, fiber: 0, fat: 81, servingSize: 100, tags: ['butter', 'dairy', 'high-fat'] },
  { name: 'Cheese (Processed)', category: 'Dairy', region: 'Indian', mealType: 'Snack', calories: 350, protein: 25, carbs: 1, fiber: 0, fat: 29, servingSize: 100, tags: ['cheese', 'dairy', 'high-protein', 'vegetarian'] },
  { name: 'Buttermilk (Chaas)', category: 'Dairy', region: 'Indian', mealType: 'Snack', calories: 40, protein: 3, carbs: 5, fiber: 0, fat: 1, servingSize: 100, tags: ['buttermilk', 'chaas', 'dairy', 'low-calorie', 'vegetarian'] },
  { name: 'Khoya/Mawa', category: 'Dairy', region: 'Indian', mealType: 'Snack', calories: 390, protein: 24, carbs: 12, fiber: 0, fat: 30, servingSize: 100, tags: ['khoya', 'mawa', 'dairy', 'high-protein', 'vegetarian'] },

  // EGGS & MEAT
  { name: 'Egg (Boiled)', category: 'Egg', region: 'Indian', mealType: 'Breakfast', calories: 155, protein: 13, carbs: 1, fiber: 0, fat: 11, servingSize: 100, tags: ['egg', 'boiled', 'high-protein'] },
  { name: 'Egg White', category: 'Egg', region: 'Indian', mealType: 'Breakfast', calories: 52, protein: 11, carbs: 1, fiber: 0, fat: 0, servingSize: 100, tags: ['egg white', 'high-protein', 'low-fat'] },
  { name: 'Chicken Breast (Grilled)', category: 'Meat', region: 'Indian', mealType: 'Lunch', calories: 165, protein: 31, carbs: 0, fiber: 0, fat: 4, servingSize: 100, tags: ['chicken', 'breast', 'grilled', 'high-protein', 'low-fat'] },
  { name: 'Chicken Thigh', category: 'Meat', region: 'Indian', mealType: 'Lunch', calories: 209, protein: 26, carbs: 0, fiber: 0, fat: 11, servingSize: 100, tags: ['chicken', 'thigh', 'high-protein'] },
  { name: 'Fish (Rohu)', category: 'Meat', region: 'Indian', mealType: 'Lunch', calories: 97, protein: 16, carbs: 0, fiber: 0, fat: 3, servingSize: 100, tags: ['fish', 'rohu', 'high-protein', 'low-fat'] },
  { name: 'Fish (Pomfret)', category: 'Meat', region: 'Indian', mealType: 'Lunch', calories: 110, protein: 19, carbs: 0, fiber: 0, fat: 4, servingSize: 100, tags: ['fish', 'pomfret', 'high-protein'] },
  { name: 'Prawn', category: 'Meat', region: 'Indian', mealType: 'Lunch', calories: 99, protein: 24, carbs: 0, fiber: 0, fat: 0, servingSize: 100, tags: ['prawn', 'shrimp', 'high-protein', 'low-fat'] },
  { name: 'Mutton (Goat)', category: 'Meat', region: 'Indian', mealType: 'Lunch', calories: 234, protein: 25, carbs: 0, fiber: 0, fat: 15, servingSize: 100, tags: ['mutton', 'goat', 'high-protein'] },

  // BREAKFAST ITEMS (ADDITIONAL)
  { name: 'Oats Porridge', category: 'Breakfast', region: 'Indian', mealType: 'Breakfast', calories: 68, protein: 2, carbs: 12, fiber: 2, fat: 1, servingSize: 100, tags: ['oats', 'porridge', 'high-fiber', 'vegetarian'] },
  { name: 'Cornflakes with Milk', category: 'Breakfast', region: 'Indian', mealType: 'Breakfast', calories: 120, protein: 4, carbs: 22, fiber: 1, fat: 2, servingSize: 100, tags: ['cornflakes', 'cereal', 'milk', 'vegetarian'] },
  { name: 'Bread (White, 2 slices)', category: 'Breakfast', region: 'Indian', mealType: 'Breakfast', calories: 265, protein: 9, carbs: 49, fiber: 3, fat: 3, servingSize: 100, tags: ['bread', 'white', 'vegetarian'] },
  { name: 'Bread (Brown, 2 slices)', category: 'Breakfast', region: 'Indian', mealType: 'Breakfast', calories: 247, protein: 13, carbs: 41, fiber: 7, fat: 3, servingSize: 100, tags: ['bread', 'brown', 'whole wheat', 'high-fiber', 'vegetarian'] },
  { name: 'Bread (Multigrain, 2 slices)', category: 'Breakfast', region: 'Indian', mealType: 'Breakfast', calories: 250, protein: 12, carbs: 42, fiber: 6, fat: 4, servingSize: 100, tags: ['bread', 'multigrain', 'high-fiber', 'vegetarian'] },
  { name: 'Toast with Butter', category: 'Breakfast', region: 'Indian', mealType: 'Breakfast', calories: 310, protein: 7, carbs: 38, fiber: 2, fat: 15, servingSize: 100, tags: ['toast', 'butter', 'vegetarian'] },
  { name: 'Bread Omelette', category: 'Breakfast', region: 'Indian', mealType: 'Breakfast', calories: 220, protein: 12, carbs: 20, fiber: 1, fat: 10, servingSize: 100, tags: ['bread', 'egg', 'high-protein'] },
  { name: 'Egg Bhurji', category: 'Breakfast', region: 'Indian', mealType: 'Breakfast', calories: 180, protein: 14, carbs: 4, fiber: 1, fat: 12, servingSize: 100, tags: ['egg', 'scrambled', 'spiced', 'high-protein'] },
  { name: 'Sprouts Salad', category: 'Breakfast', region: 'Indian', mealType: 'Breakfast', calories: 100, protein: 8, carbs: 16, fiber: 6, fat: 1, servingSize: 100, tags: ['sprouts', 'salad', 'high-protein', 'high-fiber', 'vegetarian'] },
  { name: 'Ragi Dosa', category: 'Breakfast', region: 'South Indian', mealType: 'Breakfast', calories: 140, protein: 4, carbs: 26, fiber: 3, fat: 2, servingSize: 100, tags: ['ragi', 'finger millet', 'dosa', 'vegetarian'] },
  { name: 'Ragi Malt', category: 'Breakfast', region: 'South Indian', mealType: 'Breakfast', calories: 80, protein: 2, carbs: 16, fiber: 2, fat: 1, servingSize: 100, tags: ['ragi', 'finger millet', 'drink', 'vegetarian'] },

  // SNACKS (ADDITIONAL)
  { name: 'Roasted Chana', category: 'Snack', region: 'Indian', mealType: 'Snack', calories: 360, protein: 20, carbs: 61, fiber: 17, fat: 6, servingSize: 100, tags: ['chana', 'roasted', 'high-protein', 'high-fiber', 'vegetarian'] },
  { name: 'Makhana (Fox Nuts)', category: 'Snack', region: 'Indian', mealType: 'Snack', calories: 350, protein: 10, carbs: 77, fiber: 14, fat: 1, servingSize: 100, tags: ['makhana', 'fox nuts', 'low-fat', 'high-fiber', 'vegetarian'] },
  { name: 'Roasted Peanuts', category: 'Snack', region: 'Indian', mealType: 'Snack', calories: 587, protein: 26, carbs: 16, fiber: 8, fat: 50, servingSize: 100, tags: ['peanuts', 'roasted', 'high-protein', 'vegetarian'] },
  { name: 'Chiwda', category: 'Snack', region: 'Indian', mealType: 'Snack', calories: 450, protein: 10, carbs: 55, fiber: 4, fat: 22, servingSize: 100, tags: ['chiwda', 'mixture', 'snack', 'vegetarian'] },
  { name: 'Thekua', category: 'Snack', region: 'Indian', mealType: 'Snack', calories: 420, protein: 6, carbs: 58, fiber: 2, fat: 18, servingSize: 100, tags: ['thekua', 'wheat', 'sweet', 'bihari', 'vegetarian'] },
  { name: 'Khakhra', category: 'Snack', region: 'Indian', mealType: 'Snack', calories: 380, protein: 10, carbs: 60, fiber: 4, fat: 12, servingSize: 100, tags: ['khakhra', 'gujarati', 'crispy', 'vegetarian'] },
  { name: 'Papdi', category: 'Snack', region: 'Indian', mealType: 'Snack', calories: 400, protein: 8, carbs: 52, fiber: 2, fat: 18, servingSize: 100, tags: ['papdi', 'crispy', 'chaat', 'vegetarian'] },
  { name: 'Chana Chaat', category: 'Snack', region: 'Indian', mealType: 'Snack', calories: 150, protein: 8, carbs: 22, fiber: 6, fat: 3, servingSize: 100, tags: ['chana', 'chaat', 'high-protein', 'vegetarian'] },
  { name: 'Fruit Salad', category: 'Snack', region: 'Indian', mealType: 'Snack', calories: 60, protein: 1, carbs: 15, fiber: 2, fat: 0, servingSize: 100, tags: ['fruit', 'salad', 'low-calorie', 'vegetarian'] },
  { name: 'Boiled Corn', category: 'Snack', region: 'Indian', mealType: 'Snack', calories: 96, protein: 3, carbs: 21, fiber: 2, fat: 1, servingSize: 100, tags: ['corn', 'boiled', 'vegetarian'] },
  { name: 'Masala Corn', category: 'Snack', region: 'Indian', mealType: 'Snack', calories: 110, protein: 3, carbs: 22, fiber: 2, fat: 2, servingSize: 100, tags: ['corn', 'masala', 'spiced', 'vegetarian'] },
  { name: 'Roasted Sweet Potato', category: 'Snack', region: 'Indian', mealType: 'Snack', calories: 90, protein: 2, carbs: 21, fiber: 3, fat: 0, servingSize: 100, tags: ['sweet potato', 'roasted', 'complex-carbs', 'vegetarian'] },
  { name: 'Samosa Chaat', category: 'Snack', region: 'Indian', mealType: 'Snack', calories: 280, protein: 7, carbs: 32, fiber: 3, fat: 14, servingSize: 100, tags: ['samosa', 'chaat', 'vegetarian'] },
  { name: 'Sev Puri', category: 'Snack', region: 'Indian', mealType: 'Snack', calories: 200, protein: 4, carbs: 28, fiber: 2, fat: 9, servingSize: 100, tags: ['sev', 'puri', 'chaat', 'vegetarian'] },
  { name: 'Dahi Puri', category: 'Snack', region: 'Indian', mealType: 'Snack', calories: 220, protein: 5, carbs: 30, fiber: 2, fat: 9, servingSize: 100, tags: ['dahi', 'puri', 'chaat', 'vegetarian'] },
  { name: 'Pani Puri (6 pcs)', category: 'Snack', region: 'Indian', mealType: 'Snack', calories: 150, protein: 3, carbs: 24, fiber: 1, fat: 5, servingSize: 100, tags: ['pani puri', 'golgappa', 'chaat', 'vegetarian'] },
  { name: 'Aloo Tikki Chaat', category: 'Snack', region: 'Indian', mealType: 'Snack', calories: 240, protein: 5, carbs: 30, fiber: 3, fat: 12, servingSize: 100, tags: ['aloo tikki', 'chaat', 'vegetarian'] },
  { name: 'Chole Kulche', category: 'Snack', region: 'Indian', mealType: 'Snack', calories: 350, protein: 12, carbs: 48, fiber: 6, fat: 12, servingSize: 100, tags: ['chole', 'kulche', 'punjabi', 'vegetarian'] },

  // PACKAGED/PROCESSED FOODS
  { name: 'Maggi Noodles', category: 'Packaged', region: 'Indian', mealType: 'Snack', calories: 380, protein: 9, carbs: 57, fiber: 3, fat: 14, servingSize: 100, tags: ['maggi', 'instant noodles', 'packaged', 'vegetarian'] },
  { name: 'Yippee Noodles', category: 'Packaged', region: 'Indian', mealType: 'Snack', calories: 370, protein: 8, carbs: 56, fiber: 2, fat: 13, servingSize: 100, tags: ['yippee', 'instant noodles', 'packaged', 'vegetarian'] },
  { name: 'Kurkure', category: 'Packaged', region: 'Indian', mealType: 'Snack', calories: 520, protein: 6, carbs: 60, fiber: 2, fat: 28, servingSize: 100, tags: ['kurkure', 'chips', 'packaged', 'vegetarian'] },
  { name: 'Lays Chips', category: 'Packaged', region: 'Indian', mealType: 'Snack', calories: 536, protein: 7, carbs: 53, fiber: 4, fat: 34, servingSize: 100, tags: ['lays', 'chips', 'packaged', 'vegetarian'] },
  { name: 'Parle-G Biscuit', category: 'Packaged', region: 'Indian', mealType: 'Snack', calories: 450, protein: 7, carbs: 72, fiber: 2, fat: 15, servingSize: 100, tags: ['parle-g', 'biscuit', 'packaged', 'vegetarian'] },
  { name: 'Marie Gold Biscuit', category: 'Packaged', region: 'Indian', mealType: 'Snack', calories: 430, protein: 8, carbs: 68, fiber: 3, fat: 14, servingSize: 100, tags: ['marie', 'biscuit', 'packaged', 'vegetarian'] },
  { name: 'Good Day Biscuit', category: 'Packaged', region: 'Indian', mealType: 'Snack', calories: 480, protein: 7, carbs: 65, fiber: 2, fat: 22, servingSize: 100, tags: ['good day', 'biscuit', 'packaged', 'vegetarian'] },
  { name: 'Digestive Biscuit', category: 'Packaged', region: 'Indian', mealType: 'Snack', calories: 440, protein: 8, carbs: 64, fiber: 4, fat: 17, servingSize: 100, tags: ['digestive', 'biscuit', 'packaged', 'vegetarian'] },
  { name: 'Oats Biscuit', category: 'Packaged', region: 'Indian', mealType: 'Snack', calories: 450, protein: 9, carbs: 62, fiber: 5, fat: 18, servingSize: 100, tags: ['oats', 'biscuit', 'packaged', 'high-fiber', 'vegetarian'] },
  { name: 'Amul Butter', category: 'Packaged', region: 'Indian', mealType: 'Snack', calories: 717, protein: 1, carbs: 0, fiber: 0, fat: 81, servingSize: 100, tags: ['amul', 'butter', 'packaged', 'dairy'] },
  { name: 'Amul Cheese', category: 'Packaged', region: 'Indian', mealType: 'Snack', calories: 340, protein: 22, carbs: 2, fiber: 0, fat: 28, servingSize: 100, tags: ['amul', 'cheese', 'packaged', 'dairy', 'high-protein'] },
  { name: 'Amul Milk (Full Cream)', category: 'Packaged', region: 'Indian', mealType: 'Snack', calories: 63, protein: 3, carbs: 5, fiber: 0, fat: 4, servingSize: 100, tags: ['amul', 'milk', 'packaged', 'dairy'] },
  { name: 'Amul Taaza (Toned Milk)', category: 'Packaged', region: 'Indian', mealType: 'Snack', calories: 48, protein: 3, carbs: 5, fiber: 0, fat: 1, servingSize: 100, tags: ['amul', 'milk', 'toned', 'packaged', 'dairy'] },
  { name: 'Amul Dahi (Curd)', category: 'Packaged', region: 'Indian', mealType: 'Snack', calories: 65, protein: 3, carbs: 4, fiber: 0, fat: 4, servingSize: 100, tags: ['amul', 'curd', 'dahi', 'packaged', 'dairy'] },
  { name: 'Amul Paneer', category: 'Packaged', region: 'Indian', mealType: 'Lunch', calories: 260, protein: 18, carbs: 2, fiber: 0, fat: 20, servingSize: 100, tags: ['amul', 'paneer', 'packaged', 'dairy', 'high-protein'] },
  { name: 'Kwality Wall Ice Cream', category: 'Packaged', region: 'Indian', mealType: 'Snack', calories: 210, protein: 4, carbs: 24, fiber: 0, fat: 11, servingSize: 100, tags: ['ice cream', 'kwality', 'packaged', 'sweet', 'vegetarian'] },
  { name: 'Mother Dairy Milk', category: 'Packaged', region: 'Indian', mealType: 'Snack', calories: 60, protein: 3, carbs: 5, fiber: 0, fat: 3, servingSize: 100, tags: ['mother dairy', 'milk', 'packaged', 'dairy'] },
  { name: 'Nestle Everyday Milkmaid', category: 'Packaged', region: 'Indian', mealType: 'Snack', calories: 320, protein: 8, carbs: 55, fiber: 0, fat: 9, servingSize: 100, tags: ['nestle', 'condensed milk', 'packaged', 'sweet', 'dairy'] },
  { name: 'Haldiram Namkeen', category: 'Packaged', region: 'Indian', mealType: 'Snack', calories: 480, protein: 10, carbs: 52, fiber: 3, fat: 26, servingSize: 100, tags: ['haldiram', 'namkeen', 'packaged', 'vegetarian'] },
  { name: 'Haldiram Aloo Bhujia', category: 'Packaged', region: 'Indian', mealType: 'Snack', calories: 500, protein: 8, carbs: 50, fiber: 3, fat: 30, servingSize: 100, tags: ['haldiram', 'bhujia', 'packaged', 'vegetarian'] },
  { name: 'Britannia Nutrichoice', category: 'Packaged', region: 'Indian', mealType: 'Snack', calories: 420, protein: 10, carbs: 60, fiber: 5, fat: 16, servingSize: 100, tags: ['britannia', 'nutrichoice', 'biscuit', 'packaged', 'vegetarian'] },
  { name: 'Sunfeast Dark Fantasy', category: 'Packaged', region: 'Indian', mealType: 'Snack', calories: 470, protein: 6, carbs: 64, fiber: 2, fat: 22, servingSize: 100, tags: ['sunfeast', 'dark fantasy', 'biscuit', 'packaged', 'vegetarian'] },
  { name: 'Kellogg\'s Corn Flakes', category: 'Packaged', region: 'Indian', mealType: 'Breakfast', calories: 378, protein: 8, carbs: 84, fiber: 3, fat: 1, servingSize: 100, tags: ['kelloggs', 'corn flakes', 'cereal', 'packaged', 'vegetarian'] },
  { name: 'Kellogg\'s Oats', category: 'Packaged', region: 'Indian', mealType: 'Breakfast', calories: 370, protein: 13, carbs: 66, fiber: 10, fat: 6, servingSize: 100, tags: ['kelloggs', 'oats', 'cereal', 'packaged', 'high-fiber', 'vegetarian'] },
  { name: 'Saffola Oats', category: 'Packaged', region: 'Indian', mealType: 'Breakfast', calories: 375, protein: 14, carbs: 64, fiber: 10, fat: 6, servingSize: 100, tags: ['saffola', 'oats', 'cereal', 'packaged', 'high-fiber', 'vegetarian'] },
  { name: 'Yoga Bar Granola', category: 'Packaged', region: 'Indian', mealType: 'Breakfast', calories: 440, protein: 12, carbs: 52, fiber: 7, fat: 22, servingSize: 100, tags: ['yoga bar', 'granola', 'packaged', 'high-fiber', 'vegetarian'] },
  { name: 'Slurrp Farm Ragi Malt', category: 'Packaged', region: 'Indian', mealType: 'Breakfast', calories: 380, protein: 8, carbs: 72, fiber: 5, fat: 5, servingSize: 100, tags: ['slurrp farm', 'ragi', 'malt', 'packaged', 'vegetarian'] },
  { name: 'Patanjali Honey', category: 'Packaged', region: 'Indian', mealType: 'Snack', calories: 304, protein: 0, carbs: 82, fiber: 0, fat: 0, servingSize: 100, tags: ['patanjali', 'honey', 'packaged', 'sweet'] },
  { name: 'Dabur Chyawanprash', category: 'Packaged', region: 'Indian', mealType: 'Snack', calories: 280, protein: 2, carbs: 68, fiber: 1, fat: 0, servingSize: 100, tags: ['dabur', 'chyawanprash', 'packaged', 'ayurvedic', 'vegetarian'] },
  { name: 'Protein Bar (Yoga Bar)', category: 'Packaged', region: 'Indian', mealType: 'Snack', calories: 380, protein: 20, carbs: 45, fiber: 6, fat: 14, servingSize: 100, tags: ['protein bar', 'yoga bar', 'packaged', 'high-protein', 'vegetarian'] },
  { name: 'Whey Protein (1 scoop)', category: 'Packaged', region: 'Indian', mealType: 'Snack', calories: 120, protein: 24, carbs: 3, fiber: 0, fat: 1, servingSize: 30, tags: ['whey', 'protein', 'supplement', 'high-protein'] },
  { name: 'Peanut Butter', category: 'Packaged', region: 'Indian', mealType: 'Snack', calories: 588, protein: 25, carbs: 20, fiber: 6, fat: 50, servingSize: 100, tags: ['peanut butter', 'spread', 'high-protein', 'high-fat', 'vegetarian'] },
  { name: 'Almond Butter', category: 'Packaged', region: 'Indian', mealType: 'Snack', calories: 614, protein: 21, carbs: 19, fiber: 10, fat: 56, servingSize: 100, tags: ['almond butter', 'spread', 'high-protein', 'high-fat', 'vegetarian'] },
  { name: 'Nutella', category: 'Packaged', region: 'Indian', mealType: 'Snack', calories: 539, protein: 6, carbs: 58, fiber: 3, fat: 31, servingSize: 100, tags: ['nutella', 'chocolate spread', 'packaged', 'sweet', 'vegetarian'] },
  { name: 'Ketchup', category: 'Packaged', region: 'Indian', mealType: 'Snack', calories: 100, protein: 1, carbs: 25, fiber: 0, fat: 0, servingSize: 100, tags: ['ketchup', 'sauce', 'packaged', 'vegetarian'] },
  { name: 'Soya Chunks', category: 'Packaged', region: 'Indian', mealType: 'Lunch', calories: 335, protein: 52, carbs: 33, fiber: 13, fat: 1, servingSize: 100, tags: ['soya', 'chunks', 'high-protein', 'vegetarian', 'vegan'] },
  { name: 'Tofu', category: 'Packaged', region: 'Indian', mealType: 'Lunch', calories: 76, protein: 8, carbs: 2, fiber: 0, fat: 5, servingSize: 100, tags: ['tofu', 'soya', 'high-protein', 'vegan', 'vegetarian'] },
  { name: 'Oats Idli Mix', category: 'Packaged', region: 'Indian', mealType: 'Breakfast', calories: 350, protein: 10, carbs: 65, fiber: 6, fat: 5, servingSize: 100, tags: ['oats', 'idli', 'mix', 'packaged', 'vegetarian'] },
  { name: 'Instant Upma Mix', category: 'Packaged', region: 'Indian', mealType: 'Breakfast', calories: 360, protein: 8, carbs: 68, fiber: 4, fat: 6, servingSize: 100, tags: ['upma', 'instant', 'mix', 'packaged', 'vegetarian'] },
  { name: 'Ready-to-Eat Dal Makhani', category: 'Packaged', region: 'Indian', mealType: 'Lunch', calories: 180, protein: 8, carbs: 16, fiber: 4, fat: 10, servingSize: 100, tags: ['dal makhani', 'ready-to-eat', 'packaged', 'vegetarian'] },
  { name: 'Ready-to-Eat Paneer Butter Masala', category: 'Packaged', region: 'Indian', mealType: 'Lunch', calories: 220, protein: 10, carbs: 12, fiber: 2, fat: 16, servingSize: 100, tags: ['paneer', 'ready-to-eat', 'packaged', 'vegetarian'] },
  { name: 'Ready-to-Eat Rajma', category: 'Packaged', region: 'Indian', mealType: 'Lunch', calories: 140, protein: 8, carbs: 20, fiber: 6, fat: 3, servingSize: 100, tags: ['rajma', 'ready-to-eat', 'packaged', 'vegetarian'] },
  { name: 'Ready-to-Eat Chole', category: 'Packaged', region: 'Indian', mealType: 'Lunch', calories: 160, protein: 9, carbs: 22, fiber: 6, fat: 4, servingSize: 100, tags: ['chole', 'ready-to-eat', 'packaged', 'vegetarian'] },
  { name: 'Tata Sampann Dal', category: 'Packaged', region: 'Indian', mealType: 'Lunch', calories: 340, protein: 24, carbs: 60, fiber: 12, fat: 2, servingSize: 100, tags: ['tata', 'dal', 'packaged', 'high-protein', 'vegetarian'] },
  { name: 'Fortune Chakki Atta', category: 'Packaged', region: 'Indian', mealType: 'Lunch', calories: 340, protein: 12, carbs: 72, fiber: 10, fat: 2, servingSize: 100, tags: ['fortune', 'atta', 'wheat flour', 'packaged', 'vegetarian'] },
  { name: 'Basmati Rice (Cooked)', category: 'Packaged', region: 'Indian', mealType: 'Lunch', calories: 130, protein: 3, carbs: 28, fiber: 0, fat: 0, servingSize: 100, tags: ['basmati', 'rice', 'packaged', 'vegetarian'] },
  { name: 'Brown Rice (Cooked)', category: 'Packaged', region: 'Indian', mealType: 'Lunch', calories: 112, protein: 3, carbs: 24, fiber: 2, fat: 1, servingSize: 100, tags: ['brown rice', 'packaged', 'high-fiber', 'vegetarian'] },
  { name: 'Quinoa (Cooked)', category: 'Packaged', region: 'Indian', mealType: 'Lunch', calories: 120, protein: 4, carbs: 21, fiber: 3, fat: 2, servingSize: 100, tags: ['quinoa', 'packaged', 'high-protein', 'high-fiber', 'vegetarian'] },
  { name: 'Dosa Batter (Fermented)', category: 'Packaged', region: 'Indian', mealType: 'Breakfast', calories: 130, protein: 4, carbs: 26, fiber: 1, fat: 1, servingSize: 100, tags: ['dosa', 'batter', 'packaged', 'fermented', 'vegetarian'] },
  { name: 'Idli Batter (Fermented)', category: 'Packaged', region: 'Indian', mealType: 'Breakfast', calories: 120, protein: 4, carbs: 24, fiber: 1, fat: 1, servingSize: 100, tags: ['idli', 'batter', 'packaged', 'fermented', 'vegetarian'] },
  { name: 'Coconut Water (Tender)', category: 'Beverage', region: 'Indian', mealType: 'Snack', calories: 19, protein: 1, carbs: 4, fiber: 0, fat: 0, servingSize: 100, tags: ['coconut water', 'natural', 'hydrating', 'low-calorie', 'vegetarian'] },
  { name: 'Paper Boat Aam Panna', category: 'Packaged', region: 'Indian', mealType: 'Snack', calories: 45, protein: 0, carbs: 11, fiber: 0, fat: 0, servingSize: 100, tags: ['paper boat', 'aam panna', 'packaged', 'beverage'] },
  { name: 'Real Fruit Juice (Mango)', category: 'Packaged', region: 'Indian', mealType: 'Snack', calories: 50, protein: 0, carbs: 12, fiber: 0, fat: 0, servingSize: 100, tags: ['real', 'mango juice', 'packaged', 'beverage'] },
  { name: 'Tropicana Orange Juice', category: 'Packaged', region: 'Indian', mealType: 'Snack', calories: 45, protein: 1, carbs: 11, fiber: 0, fat: 0, servingSize: 100, tags: ['tropicana', 'orange juice', 'packaged', 'beverage'] },
  { name: 'Coca Cola', category: 'Packaged', region: 'Indian', mealType: 'Snack', calories: 42, protein: 0, carbs: 11, fiber: 0, fat: 0, servingSize: 100, tags: ['coca cola', 'soda', 'packaged', 'beverage'] },
  { name: 'Thums Up', category: 'Packaged', region: 'Indian', mealType: 'Snack', calories: 43, protein: 0, carbs: 11, fiber: 0, fat: 0, servingSize: 100, tags: ['thums up', 'soda', 'packaged', 'beverage'] },
  { name: 'Sprite', category: 'Packaged', region: 'Indian', mealType: 'Snack', calories: 40, protein: 0, carbs: 10, fiber: 0, fat: 0, servingSize: 100, tags: ['sprite', 'soda', 'packaged', 'beverage'] },
  { name: 'Frooti', category: 'Packaged', region: 'Indian', mealType: 'Snack', calories: 70, protein: 0, carbs: 17, fiber: 0, fat: 0, servingSize: 100, tags: ['frooti', 'mango drink', 'packaged', 'beverage'] },
  { name: 'Red Bull', category: 'Packaged', region: 'Indian', mealType: 'Snack', calories: 45, protein: 0, carbs: 11, fiber: 0, fat: 0, servingSize: 100, tags: ['red bull', 'energy drink', 'packaged', 'beverage'] },
  { name: 'Amul Kool Kesar Pista', category: 'Packaged', region: 'Indian', mealType: 'Snack', calories: 85, protein: 2, carbs: 14, fiber: 0, fat: 3, servingSize: 100, tags: ['amul', 'kool', 'kesar pista', 'packaged', 'beverage', 'dairy'] },
  { name: 'Epigamia Greek Yogurt', category: 'Packaged', region: 'Indian', mealType: 'Snack', calories: 90, protein: 9, carbs: 8, fiber: 0, fat: 3, servingSize: 100, tags: ['epigamia', 'greek yogurt', 'packaged', 'high-protein', 'dairy'] },
  { name: 'Mother Dairy Lassi', category: 'Packaged', region: 'Indian', mealType: 'Snack', calories: 80, protein: 3, carbs: 12, fiber: 0, fat: 2, servingSize: 100, tags: ['mother dairy', 'lassi', 'packaged', 'dairy'] },
  { name: 'Britannia NutriChoice Digestive', category: 'Packaged', region: 'Indian', mealType: 'Snack', calories: 430, protein: 9, carbs: 62, fiber: 5, fat: 16, servingSize: 100, tags: ['britannia', 'digestive', 'biscuit', 'packaged', 'high-fiber', 'vegetarian'] },
  { name: 'Parle Monaco Biscuit', category: 'Packaged', region: 'Indian', mealType: 'Snack', calories: 420, protein: 9, carbs: 68, fiber: 2, fat: 13, servingSize: 100, tags: ['parle', 'monaco', 'biscuit', 'packaged', 'vegetarian'] },
  { name: 'Britannia Treat Croissant', category: 'Packaged', region: 'Indian', mealType: 'Snack', calories: 420, protein: 7, carbs: 52, fiber: 2, fat: 20, servingSize: 100, tags: ['britannia', 'croissant', 'packaged', 'vegetarian'] },
  { name: 'Lay\'s American Style Cream & Onion', category: 'Packaged', region: 'Indian', mealType: 'Snack', calories: 530, protein: 7, carbs: 54, fiber: 4, fat: 33, servingSize: 100, tags: ['lays', 'chips', 'packaged', 'vegetarian'] },
  { name: 'Haldiram\'s Aloo Bhujia', category: 'Packaged', region: 'Indian', mealType: 'Snack', calories: 500, protein: 8, carbs: 50, fiber: 3, fat: 30, servingSize: 100, tags: ['haldiram', 'bhujia', 'packaged', 'vegetarian'] },
  { name: 'Bingo Mad Angles', category: 'Packaged', region: 'Indian', mealType: 'Snack', calories: 520, protein: 6, carbs: 56, fiber: 3, fat: 30, servingSize: 100, tags: ['bingo', 'chips', 'packaged', 'vegetarian'] },
  { name: 'Uncle Chipps', category: 'Packaged', region: 'Indian', mealType: 'Snack', calories: 530, protein: 7, carbs: 53, fiber: 4, fat: 33, servingSize: 100, tags: ['uncle chipps', 'chips', 'packaged', 'vegetarian'] },
  { name: 'Kurkure Masala Munch', category: 'Packaged', region: 'Indian', mealType: 'Snack', calories: 520, protein: 6, carbs: 60, fiber: 2, fat: 28, servingSize: 100, tags: ['kurkure', 'chips', 'packaged', 'vegetarian'] },
  { name: 'Amul Dark Chocolate', category: 'Packaged', region: 'Indian', mealType: 'Snack', calories: 530, protein: 6, carbs: 52, fiber: 4, fat: 34, servingSize: 100, tags: ['amul', 'dark chocolate', 'packaged', 'vegetarian'] },
  { name: 'Cadbury Dairy Milk', category: 'Packaged', region: 'Indian', mealType: 'Snack', calories: 530, protein: 8, carbs: 58, fiber: 1, fat: 30, servingSize: 100, tags: ['cadbury', 'dairy milk', 'chocolate', 'packaged', 'vegetarian'] },
  { name: 'Munch Bar', category: 'Packaged', region: 'Indian', mealType: 'Snack', calories: 520, protein: 7, carbs: 56, fiber: 1, fat: 30, servingSize: 100, tags: ['munch', 'chocolate', 'packaged', 'vegetarian'] },
  { name: '5 Star Bar', category: 'Packaged', region: 'Indian', mealType: 'Snack', calories: 480, protein: 5, carbs: 62, fiber: 2, fat: 24, servingSize: 100, tags: ['5 star', 'chocolate', 'packaged', 'vegetarian'] },
  { name: 'KitKat', category: 'Packaged', region: 'Indian', mealType: 'Snack', calories: 510, protein: 7, carbs: 58, fiber: 2, fat: 28, servingSize: 100, tags: ['kitkat', 'chocolate', 'packaged', 'vegetarian'] },
  { name: 'Perk Bar', category: 'Packaged', region: 'Indian', mealType: 'Snack', calories: 500, protein: 6, carbs: 60, fiber: 1, fat: 26, servingSize: 100, tags: ['perk', 'chocolate', 'packaged', 'vegetarian'] },
  { name: 'Amul Fruit & Nut Chocolate', category: 'Packaged', region: 'Indian', mealType: 'Snack', calories: 540, protein: 8, carbs: 54, fiber: 3, fat: 34, servingSize: 100, tags: ['amul', 'fruit nut', 'chocolate', 'packaged', 'vegetarian'] },
  { name: 'Tata Coffee Grand', category: 'Packaged', region: 'Indian', mealType: 'Snack', calories: 2, protein: 0, carbs: 0, fiber: 0, fat: 0, servingSize: 100, tags: ['tata', 'coffee', 'packaged', 'beverage'] },
  { name: 'Bru Instant Coffee', category: 'Packaged', region: 'Indian', mealType: 'Snack', calories: 2, protein: 0, carbs: 0, fiber: 0, fat: 0, servingSize: 100, tags: ['bru', 'coffee', 'packaged', 'beverage'] },
  { name: 'Nescafe Classic Coffee', category: 'Packaged', region: 'Indian', mealType: 'Snack', calories: 2, protein: 0, carbs: 0, fiber: 0, fat: 0, servingSize: 100, tags: ['nescafe', 'coffee', 'packaged', 'beverage'] },
  { name: 'Taj Mahal Tea', category: 'Packaged', region: 'Indian', mealType: 'Snack', calories: 1, protein: 0, carbs: 0, fiber: 0, fat: 0, servingSize: 100, tags: ['taj mahal', 'tea', 'packaged', 'beverage'] },
  { name: 'Red Label Tea', category: 'Packaged', region: 'Indian', mealType: 'Snack', calories: 1, protein: 0, carbs: 0, fiber: 0, fat: 0, servingSize: 100, tags: ['red label', 'tea', 'packaged', 'beverage'] },
  { name: 'Wagh Bakri Tea', category: 'Packaged', region: 'Indian', mealType: 'Snack', calories: 1, protein: 0, carbs: 0, fiber: 0, fat: 0, servingSize: 100, tags: ['wagh bakri', 'tea', 'packaged', 'beverage'] },
];

export function searchIndianFoods(query: string): IndianFood[] {
  if (!query || query.trim().length < 2) return [];
  
  const searchTerm = query.toLowerCase().trim();
  const words = searchTerm.split(/\s+/);
  
  return indianFoods.filter(food => {
    const searchableText = `${food.name} ${food.category} ${food.region} ${food.tags.join(' ')} ${food.mealType}`.toLowerCase();
    return words.every(word => searchableText.includes(word));
  }).slice(0, 30);
}

export function getFoodsByMealType(mealType: string): IndianFood[] {
  return indianFoods.filter(f => f.mealType === mealType);
}

export function getFoodsByRegion(region: string): IndianFood[] {
  return indianFoods.filter(f => f.region === region);
}

export function getFoodsByCategory(category: string): IndianFood[] {
  return indianFoods.filter(f => f.category === category);
}

export function getFoodsByTags(tags: string[]): IndianFood[] {
  return indianFoods.filter(food => 
    tags.some(tag => food.tags.includes(tag.toLowerCase()))
  );
}
