
import {sendContactForm} from '@/actions/actions';  

export default function contactUs(){
    return(
        <div className="w-full mx-auto max-w-screen-xl">
            <div className="contact-us flex flex-wrap justify-center">
              <h2 className="text-4xl w-full underline mb-4 text-center">Contact Us</h2>
              <p className="text-center mb-8">Orem ipsum</p>
            </div>
            <form action={sendContactForm} className="flex flex-col">
              <label htmlFor="first name">First Name</label>
              <input type="text" required name="first name" className="mb-4 p-4" placeholder="First Name" />
              <label htmlFor="last name">Last Name</label>
              <input type="text" required name="last name" className="mb-4 p-4" placeholder="Last Name" />
              <label htmlFor='email'>Email</label>
              <input type="email" required name="email" className="mb-4 p-4" placeholder="Email" />
              <label htmlFor='description'>Description of Intent</label>
              <textarea className="mb-4 p-4" required name="description"></textarea>
              <button type="submit" value="submit" className='primary-btn mt-2'>Submit</button>
            </form>
           
            </div>
    )
}