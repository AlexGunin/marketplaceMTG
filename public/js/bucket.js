// <div className="bucket-wrap">

// </div>'

const bucketWrap = document.querySelector('.bucket-wrap');

function createCard(imageSrc, descr, price, quantity) {
  return `
    <div className="bucket-card">
    <div className="form-check">
      <input className="form-check-input"
             id="flexCheckDefault"
             type="checkbox"
             value="">
    </div>
    <div className="wrap-image">
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6DjhPmcedkoFjbhEzEYA_0VPj9uGJdmqbnA&usqp=CAU">
    </div>
    <div className="bucket-card__info">
      <div className="descr">Описание</div>
      <div className="price">Цена</div>
      <div className="quantity">Количество</div>
    </div>
  </div>
  `;
}
