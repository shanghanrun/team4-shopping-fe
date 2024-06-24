export const newItemDays = 20; //신상품 판단 일수
export const bestItemNo = 10; // saleCount가 가장 많은 것부터 10개를 뽑도록
sessionStorage.setItem('newItemDays', 20)
sessionStorage.setItem('bestItemNo', 10)

export const getNewItemDays = () => {
    return sessionStorage.getItem('newItemDays') ? parseInt(sessionStorage.getItem('newItemDays'), 10) : 20;
};

export const getBestItemNo = () => {
    return sessionStorage.getItem('bestItemNo') ? parseInt(sessionStorage.getItem('bestItemNo'), 10) : 10;
};