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