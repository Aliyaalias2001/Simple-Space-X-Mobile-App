export type RootStackParamList = {
    Home: undefined;
    Details: { rocket: Rocket };
  };
  
  type Rocket = {
    id: number;
    name: string;
    country: string;
    // Add more properties based on your rocket data structure
  };
  