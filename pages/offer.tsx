import myImage from './info_page_photo.jpeg';
import Effect from './effect.jpeg';
import Image from 'next/image';
import '../src/app/home.css';

export default function OfferPage() {
    const buttonStyle = {
        fontWeight: 800, // Adjust the font weight as needed
        /* You can add more inline styles here */
    };

    return (
        <div style={{ width: '100%', height: '100vh' }}>
            {/* First image */}
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', filter: 'contrast(1.2) saturate(1.1)' }}>
                <Image
                    src={Effect}
                    alt="effect"
                    layout="fill" // Make Image component cover its parent container
                    objectFit="cover" // Ensure the image covers the entire container without stretching
                />
            </div>
        
            {/* Second image */}
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0.4 }}>
                <Image
                    src={myImage}
                    alt="my image"
                    layout="fill" // Make Image component cover its parent container
                    objectFit="cover" // Ensure the image covers the entire container without stretching
                />
            </div>
            
            {/* Text on top */}
            <p style={{ position: 'absolute', zIndex: 1, top: '6%', paddingLeft: '7%', paddingRight: '7%', color: 'white', fontSize: '1.9rem', fontFamily: 'Noto Sans, sans-serif', fontWeight: 550, lineHeight: '40px', textAlign: 'center', letterSpacing: '0.04em' }}>What safety features do we offer?</p>
            <p style={{ position: 'relative', zIndex: 1, top: '24%', left: '50%', transform: 'translateX(-50%)', textAlign: 'center', fontSize: '1.9rem' }}>🚨</p>
            <p style={{ position: 'relative', zIndex: 1, top: '22%', fontSize: '1.8rem', fontWeight: 'bold', fontFamily: 'Noto Sans, sans-serif', color: '#e83d30', textAlign: 'center'}}>Real-time alert system</p>
            <p style={{ position: 'relative', zIndex: 1, top: '20%', paddingLeft: '2%', paddingRight: '2%', fontSize: '1.1rem', fontFamily: 'Noto Sans, sans-serif', color: 'white', textAlign: 'center', fontWeight: '550'}}>we will let you know if you are falling asleep or look tired</p>
            <p style={{ position: 'relative', zIndex: 1, top: '24%', left: '50%', transform: 'translateX(-50%)', textAlign: 'center', fontSize: '1.9rem' }}>👩‍💼</p>
            <p style={{ position: 'relative', zIndex: 1, top: '22%', fontSize: '1.8rem', fontWeight: 'bold', fontFamily: 'Noto Sans, sans-serif', color: '#f8d96a', textAlign: 'center'}}>Personal driving assistant</p>
            <p style={{ position: 'relative', zIndex: 1, top: '20%', paddingLeft: '2%', paddingRight: '2%', fontSize: '1.1rem', fontFamily: 'Noto Sans, sans-serif', color: 'white', textAlign: 'center', fontWeight: '550'}}>have someone to keep you engaged during the drive</p>
            <div style= {{position: 'relative', top: '34%'}} className="button-container">
            <button className="gradient-button" style={buttonStyle}>Let's drive</button>
            </div>
        </div>
    );
}