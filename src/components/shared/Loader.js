import React from 'react'
import RingLoader from "react-spinners/RingLoader";


export default function Loader(props) {
  const override = {
    display: 'block',
    margin: ' 0 auto',
    borderColor: 'red'
  }

  return (
    <RingLoader
      css={override}
      size={25}
      //size={"150px"} this also works
      color={props.color ? props.color : "#135160"}
      loading={true}
    />
  )
}
