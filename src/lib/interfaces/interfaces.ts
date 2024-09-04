interface ProductConnection {
    Product_ID: string;
    CKey: string;
    Name_product: string;
    Comment: {
        comment_ID: string;
        Text: string;
        Time: string;
        Emotion: string;
    }[]
}

interface CompanyConnection {
    Google_ID: string;
    Email: string;
    CName: string;
    CKey: string;
    Emotions:boolean[]
}

interface Alldata {
    Google_ID: string;
    Email: string;
    CName: string;
    CKey: string;
    products: ProductConnection[];
}

interface googleInfo{
    Google_ID: string;
    Email: string;
    name: string
}
type Token = {
    access_token: string;
    id_token?: string; // Optional because it might not always be present
    refresh_token?: string;
    scope?: string;
    token_type?: string;
    expiry_date?: number;
  };