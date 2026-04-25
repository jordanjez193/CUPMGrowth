export type Meal = {
  id: string
  name: string
  description?: string
  calories?: number
  protein?: number
  price: number
  tag?: string
  image: string
}

export type Chef = {
  id: string
  name: string
  photo: string
  cuisine: string
  bio: string
  rating: number
  reviews: number
  ordersLast30Days: number
  awards: string[]
  meals: Meal[]
}

const IMG = (path: string) =>
  `https://cu-media.imgix.net/${path}?height=600&width=600&fit=crop&format=webp&cs=tinysrgb&lossless=true`

const mk = (
  id: string,
  name: string,
  cal: number,
  protein: number,
  price: number,
  imagePath: string,
  tag?: string,
): Meal => ({
  id,
  name,
  calories: cal,
  protein,
  price,
  tag,
  image: IMG(imagePath),
})

export const CHEFS: Chef[] = [
  {
    id: 'esther-choi',
    name: 'Esther Choi',
    photo:
      'https://cu-website-cms-prd.s3.us-east-1.amazonaws.com/Esther_Choi_93538d0d78.png',
    cuisine: 'Korean & Asian Fusion',
    bio: 'Chef-owner of mŏkbar and Ms. Yoo. Builds bold Korean flavors learned at her grandmother’s table.',
    rating: 4.5,
    reviews: 14266,
    ordersLast30Days: 9870,
    awards: ['Zagat 30 Under 30', 'Food Republic "New Rising Chef"'],
    meals: [
      mk('ec-bibimbap', 'Bulgogi Bibimbap with Cucumber Kimchi', 630, 33, 13.99,
        'media/catalog/product/cache/x1200/b/e/beef_bibimbap_with_white_rice_-_choi-3.jpg', 'Selling Fast'),
      mk('ec-japchae', 'Bulgogi Japchae — Glass Noodles with Beef', 510, 28, 12.99,
        'media/catalog/product/cache/x1200/e/s/esther-bulgogi-japchae.jpeg'),
      mk('ec-salmon', 'Walnut Miso-Crusted Salmon', 610, 38, 14.99,
        'media/catalog/product/cache/x1200/w/a/walnut_miso_crusted_salmon.jpeg', 'Chef Pick'),
      mk('ec-ribs', 'Spicy Braised Short Ribs with Glass Noodles', 590, 36, 15.49,
        'media/catalog/product/cache/x1200/r/z/rz7ug7oq.jpeg'),
      mk('ec-curry', 'Chicken Curry Rice with Napa Kimchi', 690, 32, 11.99,
        'media/catalog/product/cache/x1200/j/0/j0mccuvq.jpeg'),
    ],
  },
  {
    id: 'einat-admony',
    name: 'Einat Admony',
    photo:
      'https://cu-website-cms-prd.s3.us-east-1.amazonaws.com/Einat_Admony_48dc7c25ca.png',
    cuisine: 'Middle Eastern & Israeli',
    bio: 'James Beard-nominated chef behind Balaboosta and Taïm, bringing the flavors of Tel Aviv to your kitchen.',
    rating: 4.4,
    reviews: 13656,
    ordersLast30Days: 8120,
    awards: [
      'James Beard Nomination',
      'Two-time Chopped champion',
      'Carnegie Great Immigrants Award',
    ],
    meals: [
      mk('ea-shrimp', 'Yemenite Shrimp Curry with Jasmine Rice', 570, 30, 14.99,
        'media/catalog/product/cache/x1200/s/p/spicy_yemenite_shrimp_curry_3617.jpeg'),
      mk('ea-shawarma', 'Middle Eastern Chicken Shawarma with Couscous', 690, 41, 12.99,
        'meal-service/meals/96/main_image/96_Einat_Admony_Marinated_Chicken_Shawarma_Over_Pearl_Couscous_Reshoot_0849.jpg', 'Chef Pick'),
      mk('ea-shortrib', 'Short Rib with Pomegranate-Walnut Sauce', 1020, 46, 17.99,
        'media/catalog/product/cache/x1200/4/4/4463.jpeg'),
      mk('ea-bowl', 'Levantine Chicken Bowl with Tahini Dressing', 580, 40, 12.49,
        'media/catalog/product/cache/x1200/e/i/einat-muhammara-chicken.jpeg'),
      mk('ea-chili', 'Vegan Mediterranean-Spiced Chili with Za\'atar Pita', 610, 22, 10.99,
        'media/catalog/product/cache/x1200/m/e/me_chili.jpeg'),
    ],
  },
  {
    id: 'akhtar-nawab',
    name: 'Akhtar Nawab',
    photo:
      'https://cu-website-cms-prd.s3.us-east-1.amazonaws.com/Akhtar_Nawab_fa5119959c.png',
    cuisine: 'Modern American & Global',
    bio: 'Chef of Alta Calidad. Layers Indian heritage into modern Mexican and global cooking.',
    rating: 4.3,
    reviews: 12881,
    ordersLast30Days: 6540,
    awards: ['Alumnus of Gramercy Tavern & Craft', 'Founding Partner, Hospitality HQ'],
    meals: [
      mk('an-jambalaya', 'Shrimp & Andouille Sausage Jambalaya', 720, 36, 13.99,
        'meal-service/meals/1254/main_image/1254_Akhtar_Nawab_Shrimp_and_Smoked_Andouille_Sausage_Jambalaya_6998.jpg', 'Selling Fast'),
      mk('an-gumbo', 'Southern Soul Gumbo', 640, 32, 13.49,
        'meal-service/meals/2682/main_image/2682_Akhtar-Nawab_Southern-Soul-Gumbo_WB_LowRes-35.jpg', 'Chef Pick'),
      mk('an-tacos', 'Slow-Cooked Pork Barbacoa Tacos', 680, 34, 13.49,
        'meal-service/meals/4614/main_image/4614_Akhtar_Nawab_Pork_Barbacoa_Tacos_Red_Rice_1251.jpg'),
      mk('an-burger', 'Lamb Burger with Tzatziki', 740, 40, 14.49,
        'meal-service/meals/2467/main_image/2467_Akhtar-Nawab_Lamb-Burger-With-Tzatziki_WB_LowRes.jpg'),
      mk('an-fried', 'Chicken Fried Rice with Scallion Sauce', 580, 38, 11.99,
        'meal-service/meals/10184/main_image/10184_Akhtar_Nawab_Chicken_Fried_Rice_1067.jpg'),
    ],
  },
  {
    id: 'michelle-bernstein',
    name: 'Michelle Bernstein',
    photo:
      'https://cu-website-cms-prd.s3.us-east-1.amazonaws.com/Michelle_Bernstein_83fe5b895f.png',
    cuisine: 'Caribbean & Pan-Latin',
    bio: 'James Beard Best Chef: South. Vibrant, eclectic flavors drawn from Miami roots and global travel.',
    rating: 4.7,
    reviews: 16004,
    ordersLast30Days: 11210,
    awards: [
      'James Beard Best Chef: South',
      'Top Chef judge',
      'Lexus Culinary Master',
    ],
    meals: [
      mk('mb-cuban', 'Cuban Pork with Mojo de Ajo & Sweet Plantains', 1480, 52, 15.99,
        'media/catalog/product/cache/x1200/c/u/cuban-pork.jpg', 'Chef Pick'),
      mk('mb-salmon', 'Citrus Roast Salmon with Fennel Mousseline', 740, 42, 14.99,
        'media/catalog/product/cache/x1200/c/i/citrus-salmon.jpg'),
      mk('mb-shortrib', 'Slow Braised Short Ribs', 800, 44, 17.49,
        'media/catalog/product/cache/x1200/b/r/braised-rib.jpg', 'Selling Fast'),
      mk('mb-skirt', 'Coffee-Rubbed Skirt Steak', 740, 41, 16.99,
        'media/catalog/product/cache/x1200/m/i/michelle-bernstein-coffee-crusted-skirt-steak.jpg'),
      mk('mb-parm', 'Chicken Parmesan with Fresh Mozzarella', 770, 48, 13.99,
        'media/catalog/product/cache/x1200/m/i/michelle_bernstein_chicken_parm.jpg'),
    ],
  },
  {
    id: 'pierre-thiam',
    name: 'Pierre Thiam',
    photo:
      'https://cu-website-cms-prd.s3.us-east-1.amazonaws.com/Pierre_Thiam_dd218212cb.png',
    cuisine: 'West African',
    bio: 'Chef and activist bringing West African cuisine to the global stage. Founder of Yolélé and Teranga NYC.',
    rating: 4.5,
    reviews: 9342,
    ordersLast30Days: 5870,
    awards: ['Exec Chef, Nok by Alara', 'Pullman Hotel Signature Chef, Dakar'],
    meals: [
      mk('pt-yassa', 'Chicken Yassa Tacos', 640, 35, 12.99,
        'meal-service/meals/7608/main_image/7608_Pierre_Thiam_Chicken_Yassa_Tacos_7519.jpg', 'Chef Pick'),
      mk('pt-suya', 'Grilled Chicken Suya with Haricot Vert', 520, 42, 13.49,
        'meal-service/meals/2233/main_image/2233_Pierre-Thiam_Grilled-Chicken-Suya-With-Haricot-Vert_WB_LowRes.jpg'),
      mk('pt-oxtail', 'Slow-Cooked Oxtail Stew', 880, 38, 16.99,
        'meal-service/meals/6795/main_image/6795_Pierre_Thaim_Oxtail_Stew_6608.jpg'),
      mk('pt-peanut', 'West African Chicken Peanut Stew', 720, 36, 12.99,
        'meal-service/meals/10359/main_image/10359_Pierre_Thiam_Chicken_Peanut_Stew_0220.jpg'),
      mk('pt-ribeye', 'Grass-Fed Ribeye Suya Bowl', 920, 48, 19.99,
        'meal-service/meals/9096/main_image/8680_Pierre_Thiam_Grass_Fed_Steak_Suya_Bowl_3083.jpg', 'Premium'),
    ],
  },
  {
    id: 'maribel-rivero',
    name: 'Maribel Rivero',
    photo:
      'https://cu-website-cms-prd.s3.us-east-1.amazonaws.com/Maribel_Rivero_30ec1a7e33.png',
    cuisine: 'Peruvian & Latin American',
    bio: 'Austin-based chef of Yuyo Peruano. Her cooking celebrates a culinary journey across South America.',
    rating: 4.4,
    reviews: 7820,
    ordersLast30Days: 4310,
    awards: ['James Beard Best Chef Nomination'],
    meals: [
      mk('mr-pollo', 'Peruvian Grilled Chicken & Veggies', 580, 42, 13.49,
        'media/catalog/product/cache/x1200/m/a/maribel-rivero-peruvian-grilled-chicken.jpg', 'Chef Pick'),
      mk('mr-brasa', 'Pollo a la Brasa', 620, 40, 12.99,
        'media/catalog/product/cache/x1200/m/a/maribel_rivero_pollo_la_brasa_.jpeg'),
      mk('mr-pulled', 'Yucatán-Style Pulled Pork Tacos', 720, 36, 13.99,
        'media/catalog/product/cache/x1200/m/a/maribelrivero_22-06-14_cochinita_pibio_089_1.jpg'),
      mk('mr-enchiladas', 'Cheese Enchiladas with Tomatillo Sauce', 660, 28, 12.49,
        'meal-service/meals/950/main_image/3_Maribel_Rivero_cheese_enchiladas_tomatillo_sauce_WB_lowres_.jpg'),
      mk('mr-snapper', 'Grilled Red Snapper with Chimichurri', 540, 38, 16.49,
        'media/catalog/product/cache/x1200/m/a/maribelrivero_22-06-14_grilled_barramundi_085.jpg'),
    ],
  },
  {
    id: 'dustin-taylor',
    name: 'Dustin Taylor',
    photo:
      'https://cu-website-cms-prd.s3.us-east-1.amazonaws.com/Dustin_Taylor_cead58110f.png',
    cuisine: 'Modern American',
    bio: 'Trained under Michelin-rated chefs Daniel Boulud and Alain Ducasse. Globally-influenced comfort food.',
    rating: 4.3,
    reviews: 6210,
    ordersLast30Days: 3980,
    awards: ['Food Network Competition Winner', 'Trained at Alain Ducasse'],
    meals: [
      mk('dt-burrito', 'Mexican Chorizo Breakfast Burrito with Salsa Verde', 690, 32, 11.99,
        'media/catalog/product/cache/x1200/d/u/dustin-chorizobreakfast.jpg'),
      mk('dt-bowl', 'Greek Quinoa Bowl with Grilled Chicken', 520, 38, 12.49,
        'media/catalog/product/cache/x1200/1/_/1.jpg', 'Selling Fast'),
      mk('dt-cod', 'Aleppo Spiced Cod with Brussels Sprouts', 480, 36, 14.49,
        'media/catalog/product/cache/x1200/a/l/aleppo_lemon_cod.jpeg'),
      mk('dt-piri', 'Piri Piri Spiced Chicken with Stewed Peppers', 610, 44, 13.49,
        'media/catalog/product/cache/x1200/d/u/dustin-spiced-chicken2.jpg'),
      mk('dt-lasagna', 'Turkey Bolognese Lasagna with Fresh Pasta', 760, 40, 13.99,
        'media/catalog/product/cache/x1200/t/u/turkey_lasagna_-_plated2.jpeg'),
    ],
  },
  {
    id: 'chris-ratel',
    name: 'Chris Ratel',
    photo:
      'https://cu-website-cms-prd.s3.us-east-1.amazonaws.com/Chris_Ratel_24e8f3e5f0.png',
    cuisine: 'American Comfort',
    bio: 'NYC-trained private chef whose comfort cooking lands as warmly as a Sunday supper.',
    rating: 4.5,
    reviews: 5920,
    ordersLast30Days: 3120,
    awards: ['Trained at Park Hyatt & Grand Central Oyster Bar'],
    meals: [
      mk('cr-jambalaya', 'Jambalaya Pasta in Creamy Creole Sauce', 720, 30, 12.99,
        'media/catalog/product/cache/x1200/r/a/ratel-jambalaya.pasta.4321.jpeg', 'Chef Pick'),
      mk('cr-salmon', 'Salmon Patties with Chive Aioli', 540, 36, 13.49,
        'media/catalog/product/cache/x1200/s/a/salmonburger.jpeg'),
      mk('cr-lasagna', 'Vegetarian Lasagna with Fresh Pasta', 650, 26, 11.99,
        'media/catalog/product/cache/x1200/k/q/kq5zllbg.jpeg'),
      mk('cr-cod', 'Lemon Pesto Cod', 480, 38, 14.49,
        'meal-service/meals/64/main_image/64_Chris_Ratel_lemon_pesto_cod_2287.jpg'),
      mk('cr-fried', 'Southern Fried Chicken with Spicy Honey', 880, 42, 13.99,
        'media/catalog/product/cache/x1200/c/h/chris-ratel-hot-honey-fried-chicken-buttermilk-mashed-potatoes-honey_drizzle.jpg'),
    ],
  },
  {
    id: 'john-delucie',
    name: 'John DeLucie',
    photo:
      'https://cu-website-cms-prd.s3.us-east-1.amazonaws.com/John_De_Lucie_0e67d16f7f.png',
    cuisine: 'Italian & Modern American',
    bio: 'NYC veteran behind The Lion and The Waverly Inn. European technique with universal appeal.',
    rating: 4.6,
    reviews: 10240,
    ordersLast30Days: 7240,
    awards: ['Former Chef de Cuisine at Oceana'],
    meals: [
      mk('jd-mac', 'White Truffle Mac & Cheese', 1060, 28, 16.99,
        'media/catalog/product/cache/x1200/m/a/macandcheese-johndl.jpeg', 'Premium'),
      mk('jd-rigatoni', 'Mom\'s Sunday Sauce Rigatoni with Fennel Sausage', 820, 38, 14.99,
        'media/catalog/product/cache/x1200/s/u/sunday_sauce_rigatoni_with_meatballs_-_3564.jpeg', 'Chef Pick'),
      mk('jd-tagliata', 'Grilled Tagliata Steak with Arugula Salad', 520, 44, 17.99,
        'media/catalog/product/cache/x1200/s/t/steak-johndelucie.jpeg'),
      mk('jd-cacio', 'Cacio e Pepe', 670, 24, 12.99,
        'meal-service/meals/339/main_image/339_John_Delucie_Cacio_E_Pepe_4976.jpg'),
      mk('jd-salmon', 'Roasted Salmon with Cherry Tomatoes', 440, 38, 14.49,
        'media/catalog/product/cache/x1200/j/d/jdl_-_roasted_salmon.jpeg'),
    ],
  },
  {
    id: 'jose-garces',
    name: 'Jose Garces',
    photo:
      'https://cu-website-cms-prd.s3.us-east-1.amazonaws.com/Jose_Garces_2c95fc141e.png',
    cuisine: 'Spanish & Latin-American',
    bio: 'Iron Chef, James Beard Award-winner, and food innovator known for vibrant Spanish tapas and Latin-American flavors.',
    rating: 4.6,
    reviews: 18420,
    ordersLast30Days: 12480,
    awards: ['James Beard Award', 'Iron Chef America', 'Author, Latin Evolution'],
    meals: [
      mk('jg-mole', 'Chicken in Mole Poblano', 510, 38, 13.99,
        'meal-service/meals/21/main_image/21_Jose_Garces_Chicken_in_Mole_Poblano_9744.jpg', 'Chef Pick'),
      mk('jg-mahi', 'Blackened Mahi Mahi with Mango-Habanero Salsa', 810, 42, 14.99,
        'meal-service/meals/65/main_image/240528_CookUnity_Jose-Garces_Blackened-Mahi-Mahi-Mango-Habanero-Salsa_LowRes_1466.jpg'),
      mk('jg-paella', 'Shrimp & Chorizo Paella', 580, 36, 15.99,
        'meal-service/meals/250/main_image/ID_Jose-Garces_Shrimp_Chorizo_Paella_WB_lowres.jpg', 'Selling Fast'),
    ],
  },
]

export const findMealById = (id: string) => {
  for (const chef of CHEFS) {
    const m = chef.meals.find(meal => meal.id === id)
    if (m) return { meal: m, chef }
  }
  return null
}
