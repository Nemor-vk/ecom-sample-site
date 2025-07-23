export const STORE_NAME = 'Vivek Store'


export const NAV_ITEMS = [
    // {href : '/about', label : 'About', key : 'about', icon: '<CircleUser>'},
    {href : '/cart', label : 'Cart', key : 'cart', icon: 'icon-shopping-cart'},
]

export const FEATURED_CATEGORIES = [
    {href : '/fashion', label : 'Fashion', imgSrc:'/assets/categories/clothShopping.jpg', key : 'fashiom'},
    {href : '/accessories', label : 'Computer Accessories', imgSrc:'/assets/categories/accessories.jpg', key : 'accessories'},
    {href : '/kitchen', label : 'Kitchen', imgSrc:'/assets/categories/cooking.jpg', key : 'kicthen'},
    {href : '/watches', label : 'Watches', imgSrc:'/assets/categories/watch.jpg', key : 'watches'},
    {href : '/jewellery', label : 'Jewellery', imgSrc:'/assets/categories/jewel.jpg', key : 'jewellery'},
    {href : '/footwear', label : 'Footwear', imgSrc:'/assets/categories/footwear.jpg', key : 'footwear'},
]

export const TRENDING_PRODUCTS = [
    {name:'Casio G-Shock Analog-Digital Blue Dial Men (G1614)', price:'15000', category:'watches', rating:'4.6', key:'watch1'},
    {name:'Casio G-Shock Analog-Digital Blue Dial Men (G1614)', price:'15000', category:'watches', rating:'4.6', key:'watch2'},
    {name:'Casio G-Shock Analog-Digital Blue Dial Men (G1614)', price:'15000', category:'watches', rating:'4.6', key:'watch3'},
    {name:'Casio G-Shock Analog-Digital Blue Dial Men (G1614)', price:'15000', category:'watches', rating:'4.6', key:'watch4'},
    {name:'Casio G-Shock Analog-Digital Blue Dial Men (G1614)', price:'15000', category:'watches', rating:'4.6', key:'watch5'},
    {name:'Casio G-Shock Analog-Digital Blue Dial Men (G1614)', price:'15000', category:'watches', rating:'4.6', key:'watch6'},
    {name:'Casio G-Shock Analog-Digital Blue Dial Men (G1614)', price:'15000', category:'watches', rating:'4.6', key:'watch7'},
    {name:'Casio G-Shock Analog-Digital Blue Dial Men (G1614)', price:'15000', category:'watches', rating:'4.6', key:'watch8'},
]

type PROMO_CARD = {
    title: string;
    promo: string;
    discount: boolean;
    cashback: boolean;
    path:string;
};

export const PROMO_CARD: PROMO_CARD[]  = [
    {title:'Mens Fashion Wear', discount:true, promo:'10%', cashback: false, path:'/assets/banners/menswear.jpg'},
    {title:'Cashback On Electronics', discount:false, promo:'10%', cashback:true, path:'/assets/banners/gadgets2.png'},
    {title:'Trendy Clothes For Women', discount:false, promo:'10%', cashback:true, path:'/assets/banners/womenswear.png'},
]

export enum SECTION_TYPE {
    TRENDING = 'Trending',
    POPULAR = 'Popular'
}

export enum PRODUCT_TYPE {
    PHYSICAL = 'PHYSICAL',
    DIGITAL = 'DIGITAL'
}

export const ADMIN_SIDEBAR_LINKS = [
    {name:'DashBoard', href:'/admin/', key:'dashboard'},
    {name:'Orders', href:'/admin/orders', key:'orders'},
    {name:'Products', href:'/admin/products', key:'products'},
    {name:'Customers', href:'/admin/customers', key:'customers'},
    {name:'Categories', href:'/admin/categories', key:'category'},
    {name:'Analytics', href:'/admin/analytics', key:'analytics'},
]

export const COLLAGE_PROMO = [
    {title: 'Classic Watches', subTitle:'Shop coolest classic watches', imgPath:'/assets/banners/watch.png', style: '' , spanClass: '' },
    {title: 'Womens Bag', subTitle:'latest collection for women', imgPath:'/assets/banners/womenbag.png', style: '', spanClass: 'md:row-span-2'},
    {title: 'Sneakers', subTitle:'Find the trendiest sneakers at great discounts', style: '', imgPath:'/assets/banners/sneakers.jpg' , spanClass: ''},
    // {title: 'Gaming Laptops', subTitle:'All new gaming laptops with the biggest price drops', href: '', imageSrc: '', spanClass: 'col-span-2'},
]

export const CAT = [
    {title:'DashBoard', href:'/admin/', key:'dashboard' , description: 'ahcd  cndkn  csdjncjk ckjdnc c dncdsn'},
    {title:'DashBoard1', href:'/admin/', key:'dashboard1' , description: 'ahcd  cndkn  csdjncjk ckjdnc c dncdsn'},
    {title:'DashBoard2', href:'/admin/', key:'dashboard2' , description: 'ahcd  cndkn  csdjncjk ckjdnc c dncdsn'},
    {title:'DashBoard3', href:'/admin/', key:'dashboard3' , description: 'ahcd  cndkn  csdjncjk ckjdnc c dncdsn'},
]

export enum CURRENCY {
    INR = "\u20B9",
}

export enum ROUTES {
    SHOP = '/shop/',
}

export const CHARGES = {
    SHIPPING : 45,
    PLATFORM_FEES : 10,
    FREE_SHIPPING_CART_VALUE: 499
}

export const TAXES_IN_PERCENTAGE = {
    CLOTHS : 5,
}

export const ALL_CATEGORIES = 'products';

export type IMAGEKIT_IMG_TYPE = {filePaths:string}[]

export const IndianCities = [
    'Mumbai',
    'Kolkata',
    'delhi',
    'Jaipur',
    'Bangalore'
]

export enum SITE_ROLES {
    AMDIN = 'ADMIN',
    USER = 'USER'
}

export const DEFAULT_IMG_SIZES = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw";

export const INDIAN_STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal"
];

export const INDIAN_CITIES_BY_STATE: Record<string, string[]> = {
  "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Guntur", "Tirupati", "Kurnool"],
  "Arunachal Pradesh": ["Itanagar", "Naharlagun", "Pasighat", "Tawang", "Ziro"],
  "Assam": ["Guwahati", "Silchar", "Dibrugarh", "Jorhat", "Tezpur"],
  "Bihar": ["Patna", "Gaya", "Bhagalpur", "Muzaffarpur", "Darbhanga"],
  "Chhattisgarh": ["Raipur", "Bhilai", "Bilaspur", "Korba", "Durg"],
  "Goa": ["Panaji", "Margao", "Vasco da Gama", "Mapusa", "Ponda"],
  "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar"],
  "Haryana": ["Gurugram", "Faridabad", "Panipat", "Ambala", "Hisar"],
  "Himachal Pradesh": ["Shimla", "Dharamshala", "Mandi", "Solan", "Kullu"],
  "Jharkhand": ["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro", "Hazaribagh"],
  "Karnataka": ["Bengaluru", "Mysuru", "Mangaluru", "Hubballi", "Belagavi"],
  "Kerala": ["Thiruvananthapuram", "Kochi", "Kozhikode", "Thrissur", "Kollam"],
  "Madhya Pradesh": ["Bhopal", "Indore", "Jabalpur", "Gwalior", "Ujjain"],
  "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Nashik", "Aurangabad"],
  "Manipur": ["Imphal", "Thoubal", "Bishnupur", "Churachandpur", "Ukhrul"],
  "Meghalaya": ["Shillong", "Tura", "Nongpoh", "Baghmara", "Jowai"],
  "Mizoram": ["Aizawl", "Lunglei", "Champhai", "Serchhip", "Kolasib"],
  "Nagaland": ["Kohima", "Dimapur", "Mokokchung", "Tuensang", "Wokha"],
  "Odisha": ["Bhubaneswar", "Cuttack", "Rourkela", "Sambalpur", "Berhampur"],
  "Punjab": ["Ludhiana", "Amritsar", "Jalandhar", "Patiala", "Bathinda"],
  "Rajasthan": ["Jaipur", "Jodhpur", "Udaipur", "Kota", "Ajmer"],
  "Sikkim": ["Gangtok", "Namchi", "Gyalshing", "Mangan", "Rangpo"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem"],
  "Telangana": ["Hyderabad", "Warangal", "Nizamabad", "Karimnagar", "Khammam"],
  "Tripura": ["Agartala", "Udaipur", "Dharmanagar", "Kailasahar", "Belonia"],
  "Uttar Pradesh": ["Lucknow", "Kanpur", "Varanasi", "Agra", "Meerut"],
  "Uttarakhand": ["Dehradun", "Haridwar", "Haldwani", "Roorkee", "Nainital"],
  "West Bengal": ["Kolkata", "Asansol", "Siliguri", "Durgapur", "Howrah"]
};

export const IMAGE_CONSTANTS = {
    PLACEHOLDER_GALLERY_IMG : '/assets/images/placeholder-img.png',
} 


