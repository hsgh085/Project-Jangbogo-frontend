// import axios from 'axios';

// const API_KEY = '2e778ab5ba2240679524';
// const API_ENDPOINT = `http://openapi.foodsafetykorea.go.kr/api/${API_KEY}/C005/json/1/5`;



// export const fetchProductInfo = async (barcode) => {
//     try 
//       const response = await axios.get(API_ENDPOINT, {
//         params: {
//           BAR_CD: barcode,
//         },
//       });
  
//       if (response.data.RESULT && response.data.RESULT.CODE === 'INFO-000') {
//         if (response.data.row && response.data.row.length > 0) {
//           return response.data.row[0];
//         } else {
//           throw new Error('제품 정보를 찾을 수 없습니다.');
//         }
//       } else {
//         throw new Error(response.data.RESULT.MESSAGE);
//       }
//     } catch (error) {
//       throw new Error('API 요청 실패: ' + error.message);
//     }
//   };