import React, { memo, useRef } from 'react';
import { Deck } from '@deck.gl/core';
import { FlyToInterpolator } from '@deck.gl/core'
import { DistrictLayer, ScatterplotLayer } from 'deck.gl-district';
import Header from './components/header';
import LeftPanel from './components/left-panel';
import RightPanel from './components/right-panel';
import CenterPanel from './components/center-panel';
import BottomPanel from './components/bottom-panel';
import './index.less';
import { useEffect } from 'react';
import { useState } from 'react';

const INITIAL_VIEW_STATE = {
  longitude: 106.469,
  latitude: 36.54,
  zoom: 3.97,
  pitch: 0,
  bearing: -0.095,
};

document.oncontextmenu = () => {
  return false
}

const animateData = [
  {
    longitude: 106.469,
    latitude: 36.54,
    zoom: 3.97,
    pitch: 0,
    bearing: -0.095,
    data: null,
  },
  {
    longitude: 123.2832,
    latitude: 45.6386,
    zoom: 4.97,
    pitch: 34.94,
    bearing: -0.095,
    data: {
      city: '长春',
      imgUrl: 'http://10.78.6.180:9000/test.png',
      map: 12,
      duration: 200,
      mileage: 23330,
      dataAmount: 12
    }
  }, {
    longitude: 115.4790,
    latitude: 40.356,
    zoom: 5.95,
    pitch: 0.35,
    bearing: -4.125,
    data: {
      city: '北京',
      imgUrl: 'http://10.78.6.180:9000/test.png',
      map: 12,
      duration: 200,
      mileage: 23330,
      dataAmount: 12
    }
  }, {
    longitude: 118.05503,
    latitude: 32.9275,
    zoom: 6.29,
    pitch: 28.44,
    bearing: -3.844,
    data: {
      city: '南京',
      imgUrl: 'http://10.78.6.180:9000/test.png',
      map: 12,
      duration: 200,
      mileage: 23330,
      dataAmount: 12
    }
  }
]

const DashBoard = () => {
  const [centerState, setCenterState] = useState(false)
  const [centerData, setCenterData] = useState(null)
  const mapRef = useRef(null);


  useEffect(() => {
    const chinaLayer = new DistrictLayer({
      id: 'district-layer',
      url: ['http://10.78.6.180:9000/geojson.json', 'http://10.78.6.180:9000/china-outline.json'],
      data: [],
      joinBy: ['id', 'id'],
      texture: 'http://119.45.14.184:8080/public/grid.png',
      coordinates: [53, 61, 162, 61, 162, -13, 53, -13],
      getHeight: (d) => 100000,
      getFillColor: d => [30, 103, 208, 100],
      pickable: false,
      autoHighlight: true,
      lightSide: true,
      lightSideBaseRatio: 1,
      lightSideTopRatio: 3,
      highlightColor: [64, 169, 255, 122],
      opacity: 1,
      gradient: [1, 1],
      outlineWidth: 2500,
      outlineHeight: 100200,
      outlineColor: [145, 213, 255],
      inlineWidth: 2500,
      inlineColor: [200, 200, 200],
    });
    
    const scatterLayer = new ScatterplotLayer({
      id: 'scatterplot-layer',
      data: [{
        name: '南京',
        coordinates: [118.76218, 32.04358, 100000]
      }, {
        name: '长春',
        coordinates: [125.3245, 43.886841, 100000]
      }, {
        name: '北京',
        coordinates: [116.405285, 39.904989, 100000]
      }],
      opacity: 0.7,
      stroked: true,
      filled: true,
      radiusScale: 10,
      radiusMinPixels: 1,
      radiusMaxPixels: 1000,
      lineWidthMinPixels: 7,
      duration: 3000,
      getPosition: d => d.coordinates,
      getRadius: d => 10000,
      getLineWidth: d => 10,
      getFillColor: d => [249, 118, 195],
      getLineColor: d => [249, 118, 195, 100]
    });

    if (!window.deckgl) {
      const deckgl = new Deck({
        parent: mapRef.current,
        initialViewState: INITIAL_VIEW_STATE,
        controller: true,
        layers: [chinaLayer, scatterLayer],
        _animate: true,
        onViewStateChange: ({ viewState }) => {
          deckgl.setProps({ viewState })
        }
      })
      window.deckgl = deckgl
    }
    const timeout = []
    animateData.forEach((item, index) => {
      const time = setTimeout(() => {
        setCenterState(false);
        deckgl.setProps({
          viewState: {
            longitude: item.longitude,
            latitude: item.latitude,
            zoom: item.zoom,
            pitch: item.pitch,
            bearing: item.bearing,
            transitionDuration: 2000,
            transitionInterpolator: new FlyToInterpolator(),
            onTransitionEnd: () => {
              setCenterState(true);
              setCenterData(item.data);
              const out = timeout.shift();
              out && clearTimeout(out);
            }
          }
        });
      }, 10000 * (index + 1))
      timeout.push(time)
    });
    const ingerval = setInterval(() => {
      animateData.forEach((item, index) => {
        const time = setTimeout(() => {
          setCenterState(false);
          deckgl.setProps({
            viewState: {
              longitude: item.longitude,
              latitude: item.latitude,
              zoom: item.zoom,
              pitch: item.pitch,
              bearing: item.bearing,
              transitionDuration: 2000,
              transitionInterpolator: new FlyToInterpolator(),
              onTransitionEnd: () => {
                setCenterState(true);
                setCenterData(item.data);
                const out = timeout.shift();
                out && clearTimeout(out);
              }
            }
          });
        }, 10000 * (index + 1))
        timeout.push(time)
      })
    }, 40000)
   

    return () => {
      ingerval && clearInterval(ingerval);
    }
  }, [])

  return (
    <div className="dashboard-container">
      <Header />
      <CenterPanel show={centerState} data={centerData} />
      <LeftPanel />
      <RightPanel />
      <BottomPanel />
      <div ref={mapRef} className="dashboard-map" />
    </div>
  )
}

export default memo(DashBoard);
