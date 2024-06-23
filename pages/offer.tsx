import myImage from './info_page_photo.jpeg';
import Effect from './effect.jpeg';
import Image from 'next/image';
import '../src/app/home.css';

export default function OfferPage() {
    const buttonStyle = {
        fontWeight: 800, // Adjust the font weight as needed
        /* You can add more inline styles here */
    };

    const handleClick = () => {
        window.location.href = '/drive';
    };

    return (
        <div style={{ width: '100%', height: '100%'}}>
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
            
            <div style={{ 
    position: 'relative', 
    width: '100%', 
    textAlign: 'center', 
    paddingTop: '12vh',  // Adjust top padding as needed
}}>
    {/* Text on top */}
    <p style={{ 
        zIndex: 1, 
        color: 'white', 
        fontSize: '1.9rem', 
        fontFamily: 'Noto Sans, sans-serif', 
        fontWeight: 550, 
        lineHeight: '40px', 
        letterSpacing: '0.04em',
        margin: 0,  // Remove default margin
    }}>What safety features do we offer?</p>

    {/* Emoji and Description 1 */}
    <div style={{ 
        marginTop: '5vh',  // Adjust top margin as needed
    }}>
        <p style={{ 
            fontSize: '1.9rem', 
            margin: 0, 
        }}>🚨</p>
        <p style={{ 
            fontSize: '1.8rem', 
            fontWeight: 'bold', 
            fontFamily: 'Noto Sans, sans-serif', 
            color: '#e83d30', 
            margin: '1vh 0',
        }}>Real-time alert system</p>
        <p style={{ 
            fontSize: '1.1rem', 
            fontFamily: 'Noto Sans, sans-serif', 
            color: 'white', 
            margin: 0,
            fontWeight: 'bold',
        }}>we will let you know if you are falling asleep or look tired</p>
    </div>

    {/* Emoji and Description 2 */}
    <div style={{ 
        marginTop: '5vh',  // Adjust top margin as needed
    }}>
        <p style={{ 
            fontSize: '1.9rem', 
            margin: 0, 
        }}>👩‍💼</p>
        <p style={{ 
            fontSize: '1.8rem', 
            fontWeight: 'bold', 
            fontFamily: 'Noto Sans, sans-serif', 
            color: '#f8d96a', 
            margin: '1vh 0',
        }}>Personal driving assistant</p>
        <p style={{ 
            fontSize: '1.1rem', 
            fontFamily: 'Noto Sans, sans-serif', 
            color: 'white', 
            margin: 0,
            fontWeight: 'bold',
        }}>have someone to keep you engaged during the drive</p>
    </div>

    {/* Button Container */}
    <div style={{ 
        marginTop: '10vh',  // Adjust top margin as needed
    }}>
        <button className="gradient-button" style={buttonStyle} onClick={handleClick}>Let's drive</button>
    </div>
</div>

        </div>
    );
}