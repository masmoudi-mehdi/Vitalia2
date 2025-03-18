/**
 * Vitalia - Centre d'Amincissement
 * Google Maps Integration Script
 * Version: 1.0
 */

/**
 * Initialize Google Maps
 * This function is called as a callback from the Google Maps API script
 */
function initMap() {
    // Check if the map container exists
    const mapElement = document.getElementById('map');
    if (!mapElement) return;
    
    // Set the center coordinates (example coordinates for Tunis)
    // In a production environment, you would use the actual coordinates for Vitalia
    const centerCoordinates = { lat: 36.8065, lng: 10.1815 };
    
    // Create the map
    const map = new google.maps.Map(mapElement, {
        center: centerCoordinates,
        zoom: 15,
        styles: mapStyles,
        mapTypeControl: false,
        fullscreenControl: false,
        streetViewControl: false,
        zoomControl: true,
        zoomControlOptions: {
            position: google.maps.ControlPosition.RIGHT_CENTER
        },
    });
    
    // Add a marker for the location
    const marker = new google.maps.Marker({
        position: centerCoordinates,
        map: map,
        title: "Vitalia Centre d'Amincissement",
        icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 10,
            fillColor: "#4EA685",
            fillOpacity: 1,
            strokeColor: "#FFFFFF",
            strokeWeight: 2
        },
        animation: google.maps.Animation.DROP
    });
    
    // Add an info window
    const infoContent = `
        <div style="text-align:center; padding:10px; max-width:200px;">
            <h3 style="margin-top:0; color:#4EA685; font-weight:600; margin-bottom:5px;">Vitalia</h3>
            <p style="margin:0 0 5px;">123 Avenue Habib Bourguiba, Tunis</p>
            <p style="margin:0 0 5px;"><a href="tel:+21671234567" style="color:#4EA685; text-decoration:none;">+216 71 234 567</a></p>
            <a href="https://maps.google.com/maps?daddr=36.8065,10.1815" target="_blank" style="color:#4EA685; text-decoration:none; font-weight:500;">Obtenir l'itinéraire</a>
        </div>
    `;
    
    const infoWindow = new google.maps.InfoWindow({
        content: infoContent
    });
    
    // Open info window when marker is clicked
    marker.addListener('click', () => {
        infoWindow.open(map, marker);
    });
    
    // Open info window by default
    infoWindow.open(map, marker);
    
    // Add a 'View Larger Map' button
    const centerControlDiv = document.createElement('div');
    const centerControl = createViewLargerMapButton(map, centerCoordinates);
    centerControlDiv.appendChild(centerControl);
    map.controls[google.maps.ControlPosition.TOP_RIGHT].push(centerControlDiv);
    
    // Make map responsive
    google.maps.event.addDomListener(window, 'resize', function() {
        google.maps.event.trigger(map, 'resize');
        map.setCenter(centerCoordinates);
    });
}

/**
 * Create a custom control button for 'View Larger Map'
 * @param {google.maps.Map} map - The Google Maps instance
 * @param {object} center - The center coordinates of the map
 * @returns {HTMLElement} - The control button element
 */
function createViewLargerMapButton(map, center) {
    const controlButton = document.createElement('button');
    controlButton.style.backgroundColor = '#fff';
    controlButton.style.border = 'none';
    controlButton.style.borderRadius = '2px';
    controlButton.style.boxShadow = '0 1px 4px rgba(0,0,0,0.3)';
    controlButton.style.cursor = 'pointer';
    controlButton.style.marginRight = '10px';
    controlButton.style.marginTop = '10px';
    controlButton.style.padding = '8px 12px';
    controlButton.style.textAlign = 'center';
    controlButton.style.color = 'rgb(25,25,25)';
    controlButton.style.fontFamily = 'Poppins, Arial, sans-serif';
    controlButton.style.fontSize = '13px';
    controlButton.style.lineHeight = '16px';
    controlButton.style.display = 'flex';
    controlButton.style.alignItems = 'center';
    controlButton.style.justifyContent = 'center';
    controlButton.innerHTML = '<i class="fas fa-external-link-alt" style="margin-right:5px;"></i> Agrandir la carte';
    controlButton.title = 'Ouvrir dans Google Maps';
    
    controlButton.addEventListener('click', () => {
        window.open(`https://www.google.com/maps/search/?api=1&query=${center.lat},${center.lng}`, '_blank');
    });
    
    return controlButton;
}

/**
 * Custom map style to match the website's theme
 */
const mapStyles = [
    {
        "featureType": "administrative",
        "elementType": "all",
        "stylers": [
            {
                "saturation": "-100"
            }
        ]
    },
    {
        "featureType": "administrative.province",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "lightness": 65
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "lightness": "50"
            },
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "all",
        "stylers": [
            {
                "saturation": "-100"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "all",
        "stylers": [
            {
                "lightness": "30"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "all",
        "stylers": [
            {
                "lightness": "40"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
            {
                "hue": "#3D8BAE"
            },
            {
                "lightness": -15
            },
            {
                "saturation": -60
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels",
        "stylers": [
            {
                "lightness": -25
            },
            {
                "saturation": -100
            }
        ]
    }
];

// Handle Google Maps API loading errors
function handleMapsError() {
    const mapElement = document.getElementById('map');
    if (mapElement) {
        mapElement.innerHTML = `
            <div style="text-align:center; padding:50px 20px;">
                <i class="fas fa-map-marker-alt" style="font-size:48px; color:#4EA685; margin-bottom:20px;"></i>
                <h3>Carte non disponible</h3>
                <p>Veuillez nous rendre visite à l'adresse :</p>
                <p><strong>123 Avenue Habib Bourguiba, Tunis</strong></p>
                <a href="https://maps.google.com/?q=36.8065,10.1815" target="_blank" class="btn btn-primary" style="margin-top:20px;">Voir sur Google Maps</a>
            </div>
        `;
    }
}

// If the Google Maps API fails to load or the API key is missing
// we'll replace the initMap function with a fallback
if (typeof google === 'undefined' || typeof google.maps === 'undefined') {
    window.initMap = function() {
        handleMapsError();
    };
}
