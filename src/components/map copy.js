import React, { Component } from "react"
import { push, Link } from "gatsby"
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
  Markers,
  Marker,
  Annotations,
  Annotation
} from "react-simple-maps"

import mapStyles from './map.module.scss'
import worldJson from "../../static/world-50m-simplified.json"

class ZoomPan extends Component {
   //handleMapClick(geography) {
   //  const { cities } = this.props
   //  // TODO Temporary fix. Will need to create a mapping later
   //  const country =
   //    geography.properties.NAME === `United States of America`
   //      ? `Usa`
   //      : geography.properties.NAME
   //  const destination = cities.filter(city => city.country === country)
   //  console.log(country)
   //  push(`/blog/london`)
   //  if (destination.length > 0) {
   //    
   //    push(`/blog/london`)
   //  }
   //}

  render() {
    const { cities, center, zoom } = this.props

    return (
      <div className={mapStyles.map}>
        <ComposableMap
          projectionConfig={{
            scale: 500,
          }}
          width={1200}
          height={zoom > 1 ? 500 : 900}
          style={{
            width: `100%`,
            height: `auto`,
          }}
        >
          <ZoomableGroup center={center} zoom={zoom} disablePanning>
            <Geographies geography={worldJson}>
              {(geographies, projection) =>
                geographies.map(
                  geography =>
                    geography.id !== `ATA` && (
                      <Geography
                        key={geography.properties.NAME}
                        geography={geography}
                        projection={projection}
                        //onClick={() => this.handleMapClick(geography)}
                        style={{
                          default: {
                            fill: `#f0f0f0`,
                            stroke: `#cdcdcd`,
                            strokeWidth: 0.75,
                            outline: `none`,
                          },
                          hover: {
                            fill: `#828282`,
                            stroke: `#cdcdcd`,
                            strokeWidth: 0.75,
                            outline: `none`,
                          },
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
                  style={{
                    default: { stroke: `#505050` },
                  }}
                >
                  <g transform="translate(-12, -24)">
                    <path
                      fill="none"
                      strokeWidth="3"
                      strokeLinecap="square"
                      strokeMiterlimit="10"
                      strokeLinejoin="miter"
                      d="M20,9c0,4.9-8,13-8,13S4,13.9,4,9c0-5.1,4.1-8,8-8S20,3.9,20,9z"
                    />
                    <circle
                      fill="none"
                      strokeWidth="2"
                      strokeLinecap="square"
                      strokeMiterlimit="10"
                      strokeLinejoin="miter"
                      cx="12"
                      cy="9"
                      r="3"
                    />
                  </g>
                </Marker>
              ))}
            </Markers>
            <Annotations>
              {cities.map((marker, id) => (
                
                  <Annotation
                  key={id}
                  dx={ -90 }
                  dy={ -30 }
                  subject={ [ marker.coordinates.lon, marker.coordinates.lat ] }
                  strokeWidth={ 1 }
                  curve={0.5}
                  stroke="#607D8B"
                  >
                  <Link to={`/blog/${marker.city}`}><text>{ marker.city }</text></Link>
                </Annotation>
              ))}
            </Annotations>
          </ZoomableGroup>
        </ComposableMap>
      </div>
    )
  }
}

ZoomPan.defaultProps = {
  center: [0, 20],
  zoom: 1,
  cities: [],
}

export default ZoomPan