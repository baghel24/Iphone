import { useGSAP } from '@gsap/react'
import gsap from 'gsap';
import React, { useRef, useState } from 'react'
import ModelView from './ModelView';
import * as THREE from 'three';
import { Canvas } from "@react-three/fiber";
import { View } from "@react-three/drei";

import yellowImg from "/assets/images/yellow.jpg";
import blueImg from "/assets/images/blue.jpg";
import whiteImg from "/assets/images/white.jpg";
import blackImg from "/assets/images/black.jpg";
export const models = [
    {
      id: 1,
      title: "iPhone 15 Pro in Natural Titanium",
      color: ["#8F8A81", "#ffe7b9", "#6f6c64"],
      img: yellowImg,
    },
    {
      id: 2,
      title: "iPhone 15 Pro in Blue Titanium",
      color: ["#53596E", "#6395ff", "#21242e"],
      img: blueImg,
    },
    {
      id: 3,
      title: "iPhone 15 Pro in White Titanium",
      color: ["#C9C8C2", "#ffffff", "#C9C8C2"],
      img: whiteImg,
    },
    {
      id: 4,
      title: "iPhone 15 Pro in Black Titanium",
      color: ["#454749", "#3b3b3b", "#181819"],
      img: blackImg,
    },
  ];
  export const sizes = [
    { label: '6.1"', value: "small" },
    { label: '6.7"', value: "large" },
  ]; 

const Model = () => {
    const [size, setSize] = useState('small');
    const [model, setModel] = useState({
        title: 'iPhone 15 Pro in Natural Titanium',
    color: ['#8F8A81', '#FFE7B9', '#6F6C64'],
    img: "/assets/images/yellow.jpg",
    });
// camera control view for the model view

const cameraControlSmall = useRef();
const cameraControlLarge = useRef();

 // model
 const small = useRef(new THREE.Group());
 const large = useRef(new THREE.Group());

 // rotation
 const [smallRotation, setSmallRotation] = useState(0);
 const [largeRotation, setLargeRotation] = useState(0);

    useGSAP(() =>{
        gsap.to('#heading', {y: 0, opacity: 1})
    }, []);

  return (
    <section className='common-padding'>
        <div className='screen-max-width'>
            <h1 id = "heading" className='section-heading'>Take a closer look</h1>
        <div className='flex flex-col items-center mt-5'>
            <div className='w-full h-[75vh] md:h-[90vh] overflow-hidden relative'>
            <ModelView 
              index={1}
              groupRef={small}
              gsapType="view1"
              controlRef={cameraControlSmall}
              setRotationState={setSmallRotation}
              item={model}
              size={size}
            />  

            <ModelView 
              index={2}
              groupRef={large}
              gsapType="view2"
              controlRef={cameraControlLarge}
              setRotationState={setLargeRotation}
              item={model}
              size={size}
            />
            <Canvas
              className="w-full h-full"
              style={{
                position: 'fixed',
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                overflow: 'hidden'
              }}
              eventSource={document.getElementById('root')}
            >
              <View.Port />
            </Canvas>
            </div>
            <div className='mx-auto w-full '>
                <p className='text-sm font-light text-center font-bold mb-5 '>{model.title}</p>
            <div className='flex-center'>
            <ul className="color-container">
                {models.map((item, i) => (
                  <li key={i} className="w-6 h-6 rounded-full mx-2 cursor-pointer" 
                  style={{ backgroundColor: item.color[0] }} 
                  onClick={() => setModel(item)} />
                ))}
              </ul>
              <button className="size-btn-container">
                {sizes.map(({ label, value }) => (
                  <span key={label} className="size-btn" 
                  style={{ backgroundColor: size === value ? 'white' : 'transparent', 
                  color: size === value ? 'black' : 'white'}} 
                  onClick={() => setSize(value)}>
                    {label}
                  </span>
                ))}
              </button>
            </div>
            
            </div>
        </div>
        </div>

    </section>
  )
}

export default Model
