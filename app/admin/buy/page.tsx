'use client'
import { useEffect, useState, useRef } from 'react'
import styles from '../admin.module.css'
import style from './buy.module.css'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import { Close } from '@mui/icons-material'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { DateTimeField } from '@mui/x-date-pickers'

interface Item {
_id: string
name: string
address: string
productId: any[]
phone: number // An array of image names
}
export default function Buy () {
const [data, setdata] = useState<any>(null)
  const [check, setcheck] = useState<any>(null)
    const [userd, setuserd] = useState<any>(null)
      const [value, setvalue] = useState<any>(null)
        const [tru, settru] = useState<any>(false)
          const dateRef = useRef<any>(null)
            const menuRef = useRef(null)
            const paidRef = useRef<any>({})
              const statusRef = useRef<any>({})
                useEffect(() => {
                console.log('useEffect triggered')

                const fetchData = async () => {
                try {
                const res = await fetch('/api/adminbuyer', { method: 'POST' })

                if (!res.ok) {
                throw new Error('Failed to fetch data')
                }

                const data = await res.json()
                console.log(data, 'this is admin data getting for buyer')
                setdata(data.purchases)
                } catch (error) {
                console.error('Error fetching data:', error)
                }
                }

                fetchData()
                }, []) // Empty dependency array ensures it runs only once when Buy component is mounted
                function icon (index: number) {
                setcheck(index)
                console.log(index)
                }
                function close () {
                setcheck(null)
                }
                async function submit (d: string) {
                let status = statusRef.current[d]?.value
                let paid = paidRef.current[d]?.value
                let dataa = { id: d, status, paid }
                console.log(dataa, 'dataaas')
                console.log(statusRef, ',,,,,,,,,,,,,,,,,')
                await fetch('/api/paid', {
                method: 'PUT',
                body: JSON.stringify(dataa)
                }).then(async d => {
                const dd = await d.json()
                console.log(dd, 'api response.....')
                if (tru) {
                settru(false)
                } else {
                settru(true)
                }
                })
                }
                function row (d: any) {
                let dd = data.find((i: any) => i._id === d)
                console.log(dd, 'this is dd')
                setuserd(dd)
                }
                async function handledate (newValue: any) {
                if (newValue) {
                // newValue will be a Day.js object
                console.log('Selected date (Day.js object):', newValue)

                // Convert the Day.js object to a JavaScript Date object if needed
                const jsDate = newValue.toDate() // Convert to JavaScript Date
                console.log('JavaScript Date:', jsDate)

                // Or get ISO string (standard format for storage or sending to the backend)
                const isoDate = newValue.toISOString() // ISO string
                console.log('ISO Date:', isoDate)

                await fetch(`/api/admindatesearch`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ date: isoDate })
                }).then(async d => {
                const dat = await d.json()
                console.log(dat)
                setdata(dat.purchases)
                })

                // Store the JavaScript Date object in the state
                }
                }
                return (
                <div className={styles.right}>
                  <h3 style={{ marginBottom: '20px', marginTop: '10px' }}>Orders data..</h3>
                  <div className={style.buycon}>
                    <div className={style.left}>
                      <div className={style.settingcon}>
                        <div className={style.findcon}>
                          <p className={style.findp}>Any status ..</p>
                        </div>
                        <div className={style.findcon}>
                          <p className={style.findp}>100ks--1500ks ..</p>
                        </div>
                        <div className={style.datecon}>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker onChange={newvalue=> handledate(newvalue)} />
                          </LocalizationProvider>
                        </div>
                      </div>

                      <div className={style.titlerow}>
                        <div className={style.order}>Order</div>
                        <div className={style.customer}>Customer</div>
                        <div className={style.status}>Status</div>
                        <div className={style.total}>Total</div>
                        <div className={style.paid}>Paid</div>
                        <div className={style.date}>Date</div>
                      </div>
                      {data &&
                      data.map((item: any, index: any) => (
                      <div key={index} onClick={()=> row(item._id)}
                        className={style.orderrow}
                        >
                        <div className={style.order}>
                          <p className={style.datep}>#{item._id.slice(-5)}</p>
                        </div>

                        <div className={style.customer}>
                          <p className={style.datep}>{item.user.name}</p>
                        </div>

                        <div className={style.status}>
                          <p className={style[item.status.toLowerCase()]}>
                            {item.status}
                          </p>
                        </div>

                        <div className={style.total}>
                          {' '}
                          {item.totalprice && (
                          <p className={style.total}>{item.totalprice} ks</p>
                          )}
                        </div>

                        <div className={style.paid}>
                          {item.paid && (
                          <p className={style[item.paid.toLowerCase()]}>
                            {item.paid}
                          </p>
                          )}
                        </div>

                        <div style={{ fontSize: '12px' }} className={style.date}>
                          {' '}
                          <p className={style.datep}>
                            {' '}
                            {new Date(item.orderDate).toLocaleString()}
                          </p>
                        </div>

                        <div className={style.item}>
                          {' '}
                          <MoreHorizIcon onClick={()=> icon(index)} />
                            <div ref={menuRef} className={ check===index ? style.statuscon : style.statusconnone }>
                              <Close className={style.close} onClick={close} sx={{ fontSize: 20 }} />
                              <div className={style.deletecon}>
                                <p>Delete</p>
                                <DeleteForeverIcon sx={{ fontSize: 20 }} />
                              </div>
                              <div className={style.statusedit}>
                                <div style={{
                          display: 'flex',
                          flexDirection: 'row',
                          gap: '10px'
                        }}>
                                  <p>Status:</p>
                                  <select id={`status-${item._id}`} className={style.option} ref={(e: any)=>
                                    (statusRef.current[item._id] = e)}
                                    name='cars'
                                    >
                                    <option value='Pending'>Pending</option>
                                    <option value='Complete'>Complete</option>
                                    <option value='Cancel'>Cancel</option>
                                  </select>
                                </div>
                                <div style={{
                          display: 'flex',
                          flexDirection: 'row',
                          gap: '10px'
                        }}>
                                  <p>Paid:</p>
                                  <select id={`paid-${item._id}`} ref={(el: any)=> (paidRef.current[item._id] = el)}
                                    className={style.option}
                                    name='cars'
                                    >
                                    <option value='No'>No</option>
                                    <option value='Yes'>Yes</option>
                                  </select>
                                </div>
                                <button className={style.submit} onClick={()=> submit(item._id)}
                                  >
                                  Submit
                                </button>
                              </div>
                            </div>
                        </div>
                      </div>
                      ))}
                    </div>
                    <div className={style.right}>
                      {userd && (
                      <div key={userd._id} className={style.usercon}>
                        <div className={style.usernamecon}>
                          <p>{userd.user.name}</p>
                          <p>{userd.user.phone}</p>
                          <p>{userd.user.address}</p>
                        </div>
                        <div className={style.productscon}>
                          {userd.products.map((dat: any, index: number) => (
                          <div key={index} className={style.productrow}>
                            <img className={style.profile} src={`images/${dat.profilepic}`}></img>
                            <p>{dat.product.brand}</p>
                            <p>price : {dat.product.price} ks</p>
                            <p>Total price : {dat.totalPrice} ks</p>

                            <p>Discount : {dat.product.discount}%</p>
                            <p>quantity : {dat.quantity}</p>
                          </div>
                          ))}
                        </div>
                      </div>
                      )}
                    </div>
                  </div>
                </div>
                )
                }