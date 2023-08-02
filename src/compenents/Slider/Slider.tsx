import React, {useEffect, useState} from "react";
import {SliderData} from './SliderData';
import './Slider.css';
import {AiOutlineArrowLeft, AiOutlineArrowRight} from "react-icons/ai";

export const Slider = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const slideLength = SliderData.length;

    const autoScroll = true;
    let slideInterval:any;
    let intervalTime = 100000;

    const nextSlide = () => {
        setCurrentSlide(currentSlide === slideLength - 1 ? 0 : currentSlide + 1);
    }
    const prevSlide = () => {
        setCurrentSlide(currentSlide === 0 ? slideLength - 1 : currentSlide - 1);
    }
    const auto = () => {
        slideInterval = setInterval(nextSlide, intervalTime)
    }

    useEffect(() => {
        setCurrentSlide(0);
    }, []);

    useEffect(() => {
        if(autoScroll){
            auto()
        }
        return () => clearInterval(slideInterval);
    }, [currentSlide]);

    return (
        <div className='slider'>
            <AiOutlineArrowLeft className='arrow prev' onClick={prevSlide}/>
            <AiOutlineArrowRight className='arrow next' onClick={nextSlide}/>
            {SliderData.map((slide: any, index: any) => {
                return (
                    <div className={index === currentSlide ? 'slide-current' : 'slide'} key={index}>
                        {index === currentSlide && (
                            <div>
                                <img className='img' src={slide.image} alt="slide"/>
                                <div className="content">
                                    <h2>{slide.heading}</h2>
                                    <p>{slide.desc}</p>
                                    <hr/>
                                </div>
                            </div>
                        )}
                    </div>
                )
            })}
        </div>
    )
};