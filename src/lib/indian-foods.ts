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
