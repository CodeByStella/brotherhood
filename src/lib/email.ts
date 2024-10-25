import { app, auth } from './firebase';

export const sendInvitation = async (email:string,link:string) => {
  const senderEmail=auth.currentUser?.email
  try {
    const response = await fetch('https://sendinviteemail-7tlpqkrlia-uc.a.run.app', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email,senderEmail,link }),
    })
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${JSON.stringify(response.status)}`)
    }
  
    const data = await response.json()
    console.log(data)
    return('Invite sent successfully!')
  } catch (error) {
    console.error('Error sending invitation:', error);
  }

};
