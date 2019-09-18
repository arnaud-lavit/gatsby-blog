import React, { Component } from "react"
import { Link } from "gatsby"
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
  Markers,
  Marker,
  Annotation
} from "react-simple-maps"
import { Motion, spring } from "react-motion"
import Tippy from '@tippy.js/react'

import mapStyles from './map.module.scss'
import worldJson from "../../static/world-110m.json"


class ZoomPan extends Component {

  state = {
    center: [0,20],
    zoom: 1,
    annotation: false,
    city: null
  }

  handleCityClick = city => {
    this.setState({
      zoom: 2,
      center: [city.coordinates.lon, city.coordinates.lat],
      annotation: true,
      city: city
    })
  }

  handleCityButtonClick = city => {
    this.setState({
      zoom: 2,
      center: [city.coordinates.lon, city.coordinates.lat],
      annotation: true,
      city: city
    })
  }

  handleReset = () => {
    this.setState({
      center: [0,20],
      zoom: 1,
      annotation: false
    })
  }

  render() {
    const { cities } = this.props
    const { center, zoom, annotation, city } = this.state

    return (
      <div className={mapStyles.container}>
        <div className={mapStyles.cities}>
          <ul>
          {cities.map((marker, id) => (      
            <li key={id}>
            <button onClick={() => this.handleCityButtonClick(marker)}>
            { marker.city }
            </button>
            </li>
          ))}
          <li><button className={mapStyles.resetbtn} onClick={this.handleReset}>
            { "Reset" }
          </button>
          </li>
          </ul>
          <div>
          
          </div>
        </div>
        <div className={mapStyles.map}>
          <Motion
            defaultStyle={{
              zoom: 1,
              x: 0,
              y: 20,
            }}
            style={{
              zoom: spring(zoom, {stiffness: 210, damping: 20}),
              x: spring(center[0], {stiffness: 210, damping: 20}),
              y: spring(center[1], {stiffness: 210, damping: 20}),
            }}
          >
          {({zoom,x,y}) => (
            <ComposableMap
              projectionConfig={{
                scale: 180,
              }}
              width={800}
              height={510}
              style={{
                width: `100%`,
                height: `auto`,
              }}
            >
              <ZoomableGroup center={[x,y]} zoom={zoom}>
              <Geographies geography={worldJson}>
                {(geographies, projection) =>
                  geographies.map(
                    (geography, id) =>
                      geography.id !== `ATA` && (
                        <Geography
                          key={id}
                          geography={geography}
                          projection={projection}
                          style={{
                            default: {
                              fill: `rgb(220, 223, 225)`,
                              outline: `none`
                            },
                            hover: {
                              fill: `rgb(96, 125, 139)`,
                              outline: `none`
                            },
                            pressed: {
                              fill: `rgb(257, 85, 34)`,
                              outline: `none`
                            }
                          }}
                        />
                      )
                  )
                }
              </Geographies>
                <Markers>
                  {cities.map((marker, id) => (
                    <Marker
                      key={id}
                      marker={{ coordinates: [marker.coordinates.lon, marker.coordinates.lat] }}
                      onClick={() => this.handleCityButtonClick(marker)}
                      style={{
                        default: { stroke: `#505050` },
                      }}
                    >
                      <circle
                        cx={0}
                        cy={0}
                        r={5}
                        fill="#FF5722"
                        stroke="#DF3702"
                      />
                    </Marker>
                  ))}
                </Markers>
                  {annotation ? (
                    <Annotation
                      dx={ -90 }
                      dy={ -30 }
                      subject={ [ city.coordinates.lon, city.coordinates.lat ] }
                      strokeWidth={ 1 }
                      curve={0.5}
                      stroke="#607D8B"
                      >
                      <Link to={`/blog/${city.link}`}>
                        <Tippy 
                          content="Clique ici !"
                          arrow={true}
                          animateFill={false}
                          animation="scale"
                        >
                          <text>{ city.city }</text>
                        </Tippy>
                      </Link>
                    </Annotation>
                  ): null
                  }        
              </ZoomableGroup>
            </ComposableMap>
          )}
          </Motion>
        </div>
      </div>
    )
  }
}

ZoomPan.defaultProps = {
  cities: []
}

export default ZoomPan