import bannerImage1 from '../assets/images/banner1.webp';
import bannerImage2 from '../assets/images/banner2.webp';
import bannerImage3 from '../assets/images/banner3.webp';
import bannerImage4 from '../assets/images/banner4.webp';
import imageProduct from '../assets/images/banner4.webp'
export const dataBannerImageHomePage = [
  {
    id: 1,
    title: "فروش تولد",
    width: "100%",
    height: "400px",
    heightImage: '100%',
    textButton: "فروش ZUM",
    image: bannerImage1,
    discription: "بیایید برای مهمانی آماده شویم! برای تولد  خود لوازم زیبایی فوق العاده را با تا 70٪ تخفیف کشف کنید - اکنون با کد BDAY در هزینه اضافی صرفه جویی کنید!",
    bgcolor: '#403f4f',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: { xs: 'column', sm: 'row' },
    flexDirectionBoxText: 'column',
    widthImage: { xs: '100%', sm: '60%',md:'50%' },
    color: "#fff",
    borderRadius: '20px'
  },
  {
    id: 2,
    title: "بالاترین تخفیف",
    width: "100%",
    height: "400px",
    heightImage: "",
    textButton: "به معاملات",
    image: bannerImage2,
    discription: "برای تولد  ما حداکثر تخفیف را به شما می دهیم - معاملات زیبایی بی نظیر را در اینجا کشف کنید! از کد BDAY برای 10٪ تخفیف اضافی استفاده کنید!",
    bgcolor: "",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: { xs: 'column', sm:"row-reverse" },
    flexDirectionBoxText: "column",
    widthImage: { xs: '100%', sm: '60%',md:'50%' },
    color: "",
    borderRadius: "20px"
  },
  {
    id: 3,
    title: "معاملات پرفروش",
    width: "100%",
    height: "400px",
    heightImage: "",
    textButton: "محصولات",
    image: bannerImage3,
    discription:"پرفروش‌ترین‌های مد روز ما به درستی دوست داشته می‌شوند و زندگی می‌کنند. ملزومات هیجان انگیز را با قیمت های عالی تجربه کنید - با کد BDAY 10٪ در بالا صرفه جویی می کنید!",
    bgcolor: "",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: { xs: 'column', sm:"row-reverse" },
    flexDirectionBoxText: "column",
    widthImage: { xs: '100%', sm: '60%',md:'50%' },
    color: "",
    borderRadius: "20px"
  },
  {
    id: 4,
    title: "برگزیده های جشنواره",
    width: "100%",
    height: "400px",
    heightImage: "",
    textButton: "اکنون کشف کنید ",
    image: bannerImage4,
    discription: "روزها رقص و مهمانی و در عین حال درخشیدن با نگاه های نفس گیر. این فقط با موارد مورد علاقه جشنواره ما امکان پذیر است - موارد ضروری ما را در اینجا کشف کنید!",
    bgcolor: "",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: { xs: 'column', sm:"row-reverse" },
    flexDirectionBoxText: "column",
    widthImage: { xs: '100%', sm: '60%',md:'50%' },
    color: "",
    borderRadius: "20px"
  },
];
export const products = [
    {
      id: 1,
      brand: "لوازم آرایشی BPerfect",
      title: "لوازم آرایشی تستی",
      originalPrice: "25,90",
      discountedPrice: "14,39",
      image:imageProduct, // مسیر تصویر محصول
      rating: "5",
      reviews: "2",
      volume:
        "10 میلی لیتر - 1.439،00 € / لیتر شامل مالیات بر ارزش افزوده و zzgl. حمل دریایی",
      additionalInfo: "تست",
    },
    {
        id: 2,
        brand: "لوازم آرایشی BPerfect",
        title: "لوازم آرایشی تستی",
        originalPrice: "25,90",
        discountedPrice: "14,39",
        image:imageProduct, // مسیر تصویر محصول
        rating: "5",
        reviews: "2",
        volume:
          "10 میلی لیتر - 1.439،00 € / لیتر شامل مالیات بر ارزش افزوده و zzgl. حمل دریایی",
        additionalInfo: "تست",
      },
      {
        id: 3,
        brand: "لوازم آرایشی BPerfect",
        title: "لوازم آرایشی تستی",
        originalPrice: "25,90",
        discountedPrice: "14,39",
        image:imageProduct, // مسیر تصویر محصول
        rating: "5",
        reviews: "2",
        volume:
          "10 میلی لیتر - 1.439،00 € / لیتر شامل مالیات بر ارزش افزوده و zzgl. حمل دریایی",
        additionalInfo: "تست",
      },
      {
        id: 4,
        brand: "لوازم آرایشی BPerfect",
        title: "لوازم آرایشی تستی",
        originalPrice: "25,90",
        discountedPrice: "14,39",
        image:imageProduct, // مسیر تصویر محصول
        rating: "5",
        reviews: "2",
        volume:
          "10 میلی لیتر - 1.439،00 € / لیتر شامل مالیات بر ارزش افزوده و zzgl. حمل دریایی",
        additionalInfo: "تست",
      },
    
      
  ];