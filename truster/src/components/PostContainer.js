const PostContainer = ({post=null}) => {

    // const addressInfo = post.getAddress().split(', ')


    return ( 
        <div className="post-container">
            {/* <div className="adress-container">
                <h3 className="street">{addressInfo[0]}</h3>
                <h3 className="city">{addressInfo[1]}</h3>
                <h3 className="country">{addressInfo[2]}</h3>
            </div>
            <h3 className="timeframe">{post.getTimeframe().start} - {post.getTimeframe().end}</h3>
            <h3 className="price">{post.getPrice()} €</h3> */}
            <div className="adress-container">
                <h3 className="street">62 Av. de la Forêt Noire</h3>
                <h3 className="city">Strasbourg</h3>
                <h3 className="country">France</h3>
            </div>
            <h3 className="timeframe">17/09/2022 - 21/09/2022</h3>
            <h3 className="price">20 €</h3>
        </div>
     );
}
 
export default PostContainer;