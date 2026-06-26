# View the temporary deployment here 

[EML-IITM](https://eml-iitm.netlify.app/).

## Available Scripts

In the project directory, you can run:

### `npm install`

### `npm start`

## Admin Access

The application includes an admin interface accessible at `/admin`. This interface is protected by Google OAuth authentication and an allowlist of authorized email addresses.

### Authentication Flow

1. Navigate to `/admin` in the application
2. Click the Google Sign-in button
3. Sign in with your Google account
4. If your email is in the authorized list, you'll be granted access to the admin dashboard
5. If not authorized, you'll receive an "Unauthorized email" message

### Managing Admin Access

To add or remove admin email addresses:

1. An existing admin must be logged in to manage email addresses
2. Use the Email Manager in the admin dashboard to:
   - View current admin emails
   - Add new admin emails
   - Remove existing admin emails

### Admin Features

The admin dashboard provides access to:
- Team management (add/edit/delete team members)
- Speaker management (add/edit/delete speakers)
- Gallery management (upload/delete images)
- Admin email management

### API Endpoints

The following endpoints handle admin authentication:

```
POST /api/auth/google-login
- Authenticates Google login and verifies admin access
- Requires: email, name, googleId

GET /api/auth/admin-emails
- Lists all authorized admin email addresses
- Requires: Admin authentication

POST /api/auth/admin-emails
- Adds a new admin email address
- Requires: Admin authentication
- Body: { email: string }

DELETE /api/auth/admin-emails/:email
- Removes an admin email address
- Requires: Admin authentication
```
### API ENV STRUCTURE:
PORT = 8000
MONGO = "mongodb+srv://........mongodb.net/"
CLOUDINARY_CLOUD_NAME=.....
CLOUDINARY_API_KEY=6......
CLOUDINARY_API_SECRET=_NZ.....

# About EML (Extra Mural Lectures, IITM) 
The Extra-Mural Lectures (EML) is the flagship lecture body of IITMadras that focuses on enhancing the learning of the students beyond the classroom. The EML series of IIT Madras was launched in the early 1980s by a group of enterprising students with strong encouragement and support from the institute. Over the years, this group has expanded into a formal student body that has been amplifying its outreach to the students at large. 

We inherit a strong legacy of innovative initiatives like EML Social and EML Omnibus. The team takes pride in having invited and given the IITM Student community the opportunity to interact with distinguished personalities like Dr APJ Abdul Kalam, Ms Indra Nooyi, His Holiness the Dalai Lama, Mr Kailash Satyarthi, Sri Sri Ravi Shankar, Mr A R Rahman, Mr Viswanathan Anand, Mr Eleanor Catton, Mr SS Rajamouli and several others. The EML sessions arein the form of interactive lectures, debates, and discussions around topics concerning science, arts, culture and society, aiming at covering as diverse fields as possible.

# Our Social Media Handles

[YouTube](https://www.youtube.com/@emliitm)  
[Instagram](https://www.instagram.com/emliitm/)  
[Twitter](https://twitter.com/emliitm?lang=en)
