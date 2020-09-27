import React from 'react'
import { Button, Header, Image, Modal } from 'semantic-ui-react'
import { Input, Form, TextArea } from 'semantic-ui-react'
import './modal.css'

export const TextInputModal = (props) => (
    <Modal className='inputModal' trigger={<Button>Show Modal</Button>}>
    <Modal.Header className='header' >  Input Your Text  </Modal.Header>
    <Modal.Content >
    
      <Modal.Description>
        <Form>
        <Input label='title' placeholder='On Self-Respect' />

        <pre className='hack' >

          
        </pre>

      <TextArea placeholder='Once in a dry season...' />
      </Form>
      <pre className='hack' >

          
</pre>
      <Button  > Done </Button>

      </Modal.Description>
    </Modal.Content>
  </Modal>
)

export default TextInputModal