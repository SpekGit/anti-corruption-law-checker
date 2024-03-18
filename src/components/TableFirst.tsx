import { useDispatch } from 'react-redux'
import IconsContent from '../assets/icons/IconsContent'
type Props ={
  orderBy?:number
}
export const TableFirst:React.FC<Props> = ({orderBy}) => {
  const dispatch = useDispatch()
  return (
    <td >
      <div className="table-first" >
        <p className="table-first__id" >ID</p>
        <div className="table-first__arrows">
          <p className="table-first__arrows--up" onClick={() => dispatch({ type: `ADD_ORDER_DESC${orderBy}`, payload: false })}>{IconsContent.ArrowDown()}</p>
          <p className="table-first__arrows--down" onClick={() => dispatch({ type: `ADD_ORDER_DESC${orderBy}`, payload: true })}>{IconsContent.ArrowDown()}</p>
        </div>
      </div>
    </td>
  )
}
