import React from 'react'
import Update from '../../../../../../components/admin/Form/Update'
export default function page({ params: { _id } }) {
  return (
    <div>
     <Update productID={_id}/>
    </div>
  )
}
