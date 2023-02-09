const ContentDetails = ({year, icon, category, rating, title}) => {
    return ( 
        <div>
          <div className="flex gap-5 text-xs opacity-75">
            <div>{year}</div>
            <div className="items-center flex gap-1">
              <span><img src={icon} alt="" className=" w-3"/></span>
              <span className="capitalize">{category}</span>
            </div>
            <div>{rating}</div>
          </div>
          <div>{title}</div>
        </div>
     );
}
 
export default ContentDetails;