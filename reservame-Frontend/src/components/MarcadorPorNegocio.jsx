// // src/components/NegocioMarker.jsx
// import { Marker, Popup } from 'react-leaflet';
// import L from 'leaflet';

// // Importar íconos
// import iconCafe from '../assets/icons/cafe.png';
// import iconTijera from '../assets/icons/tijera.png';
// import iconDefault from '../assets/icons/default.png';

// function getIconForTipo(tipo) {
//     let iconUrl;
//     switch (tipo) {
//         case 'cafe':
//             iconUrl = iconCafe;
//             break;
//         case 'peluqueria':
//             iconUrl = iconTijera;
//             break;
//         default:
//             iconUrl = iconDefault;
//     }

//     return L.icon({
//         iconUrl,
//         iconSize: [25, 41],
//         iconAnchor: [12, 41],
//         popupAnchor: [0, -41],
//         shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
//     });
// }

// const NegocioMarker = ({ negocio }) => {
//     const icon = getIconForTipo(negocio.tipo || 'default');
//     const position = negocio.ubicacion || [-34.9011 + negocio.id * 0.01, -56.1645 + negocio.id * 0.01]; // para tests

//     return (
//         <Marker position={position} icon={icon}>
//             <Popup>
//                 <strong>{negocio.nombre}</strong><br />
//                 {negocio.direccion}<br />
//                 Tel: {negocio.telefono_contacto}
//             </Popup>
//         </Marker>
//     );
// };

// export default NegocioMarker;
