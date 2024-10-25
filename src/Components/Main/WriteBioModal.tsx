'use client'
import { Modal } from "antd"
import TextEditor from "../Main/TextEditor"
import { useEffect, useState } from "react"
import { getBio, saveBio } from "@/lib/Bio"
import { useSelector } from "react-redux"
import { RootState } from "@/redux/store"
import { error, success } from "../ui/notification"

interface Props {
  visible: boolean,
  setVisible: (value: boolean) => void
}

export const WriteBioModal = ({ visible, setVisible }: Props) => {

  const [value, setValue] = useState('')
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const { data } = useSelector((state: RootState) => state.user)

  useEffect(() => {
    setLoading(true)
    if (data?.uid) getBio(data?.uid).then(res => {
      setLoading(false)
      setValue(res?.content || '')
    }).catch(() => {
      setLoading(false)
    })
  }, [])

  const handleOk = async () => {
    setSaving(true)
    const { state, msg } = await saveBio(value)
    if (state === 'success') {
      success(msg)
    } else {
      error(msg)
    }
    setVisible(false)
    setSaving(false)
  }


  return <div>
    {visible && <Modal title="Write my bio" open onCancel={() => setVisible(false)} okText='Save' okButtonProps={{ loading: saving }} onOk={handleOk} width={'80%'} loading={loading} >
      <TextEditor value={value} onChange={setValue} />
    </Modal>}
  </div>
}

