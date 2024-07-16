import "./RedWarningAlertPost.css";

function RedWarningAlert({textProps,divStyleProps,spanStyleProps}) {


  return (

    <div className={divStyleProps}>
      <span className={spanStyleProps}>
      {textProps}
      </span>
    </div>
  );
}

export default RedWarningAlert;
