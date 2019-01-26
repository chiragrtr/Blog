Installation:

1) Make sure you have node 8.9.4 or above installed on your system.
2) Make sure you have mongodb running on your localhost (preferably on port "27017") *
3) Navigate to "Blog" Directory and Run the following commands:

		git clone https://github.com/chiragrtr/Blog.git

		npm install

		npm start


4) You should see : "Server is listening on port 8989"

   Now go ahead, open Postman and hit these endpoints:
   
i) Getting list of all the users:
   
		GET localhost:8989/users

ii) Getting list of all the posts with comments:
   
		GET localhost:8989/posts

iii) Updating/changing the avatar image for given user:

For this request, Make sure you're sending a file as form-data with key/name as "avatar" in the body/payload.
   
		POST localhost:8989/upload/{userId}

Here userId is the user's id so you'll need to use the same e.g. for user with userId 1, you need to hit:

		POST localhost:8989/upload/1


That's all!

