export type RootStackParamList = {
    Home: undefined;
    Search: undefined;
    Notifications: undefined;
    Profile: undefined;
    Cart: undefined;
    Categories: undefined; 
    Products: undefined;
    Collections: undefined;
    CollectionProducts: {
      collectionId: string;
      collectionName: string;
    };
    ProductDetail: { productId: string };
  };
  