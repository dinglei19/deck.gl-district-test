
import React from 'react';
import DeckGL from '@deck.gl/react';
import {DistrictLayer} from 'deck.gl-district';

const INITIAL_VIEW_STATE = {
  longitude: 118.77798864229574,
  latitude: 32.038717810344934,
  zoom: 9,
  pitch: 45,
  bearing: 45
};

const data = [
  {
    adcode: '320102',
    value: 5000
  },{
    adcode: '320104',
    value: 6000
  },{
    adcode: '320105',
    value: 7000
  }
]
document.oncontextmenu = () => {
  return false
}

export default () => {
  
  const layers = [
    new DistrictLayer({
      id: 'district-layer',
      url: ['http://119.45.14.184:8080/public/china.json', 'http://119.45.14.184:8080/public/china-outline.json'],
      data: data,
      joinBy: ['id', 'id'],
      texture: 'http://119.45.14.184:8080/public/grid.png',
      coordinates: [113, 34, 123,34, 123, 30, 113,30],
      getHeight:(d) => {
        return d.data ? d.data.value : 100000
      },
      getFillColor: d => {
        return d.data ? [87, 63, 127] : [14, 63, 127]
      },
      pickable: false,
      autoHighlight: true,
      highlightColor: [73,253,254,122],
      opacity: 1,
      gradient: [0.2, 0.9],
      outlineWidth: 2500,
      outlineHeight: 100200,
      outlineColor: [145,213,255],
      inlineWidth: 2500,
      inlineColor: [9,104,162],
    })
  ];

  return <div  className="app" style={{
    height: '100%',
    position: 'relative',
    background: '#032148'
  }}>
    <DeckGL
      initialViewState={INITIAL_VIEW_STATE}
      controller={true}
      _animate={true}
      layers={layers} />
  </div>;
}