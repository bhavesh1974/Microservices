# Microservices
Architecture:
Services:----------------
GatewayService 
	- It will expose to outside world and will receive all requests. It will find endpoint from "Service Registry" to forward request to other internal services. It also generates unique request id before calling other service. All services will use this request id to log all the details.
AuthService 
	- It will serve APIs for Authentication. It has only "getToken" API for now but there can be more APIs related to authentication. 
MemberService 
	- It will serve APIs for Members. It has following APIs.
		GET /members -- list of all members
		GET /members/{id} -- get a single member
		POST /members -- add a member
		PUT /members/{id} -- update a member
		DELETE /members/{id} -- delete a member
ProductService 
	- It will serve APIs for Products. It has following APIs.
		GET /products -- list all the products
		GET /products/{id} -- get a single product
		POST /products -- add a product
		PUT /products/{id} -- updates a product
		DELETE /products/{id} -- delete a product
OrderService 
	- It will serve APIs for Orders. It has following APIs.
		GET /orders -- list all the orders
		GET /orders/{id} -- get a single order
		POST /orders -- add an order
		PUT /orders/{id} -- updates an order
		DELETE /orders/{id} -- delete an order
ConfigService 
	- It is not yet coded. It will provide APIs to update ServiceRegistry. 
	  E.g. 
	     addService, updateService, deleteService (All of these service should call "refreshServiceRegistry" to all other microservices so each microservice can get latest information of Services)
LogService
    - It is not yet coded. It can be used to writ log through service. All other services can call this service to write log. It can give centralized log. It can impact performance as this service will be hit number of times. 

	
Key Points:-----------	
Security: 
	AuthService will provide APIs to authenticate user/password and return the token. It is required to send generated token for subsequence APIs. GatewayService will again call AuthService to verify token. (** Right now GatewayService is verifying token. **)
	It is important to set firewall/port access for individual services so only GatewayService and internal services can communicate with each other.
Logging: 
	There can be two options. 
		#1: Each service writes its own Log and then other system/tool can consolidate these logs to central place. 
		#2: There can be central LogService and all requests calls API from this service to write log. 
	GatewayService generates unique requestId for each request and then pass same requestId to other services. All services will write log along with this requetsId.
ServiceRepository/Registry: 
	ConfigService can be used to manage service repository. It is important to update service repository to all services. E.g. GatewaySevice needs to know endpoint of each service. It can be handled through database but it will impact the performance. It can be handled through "config file" in each service but again this should be refreshed whenever endpoint is changed or new service is added. 
Scalability:
	All these services can be deployed with LoadBalancer. 
	    End User -> GatewayService Load Balancer -> GatewayService Multiple Servers -> XXXService LoadBalancer -> XXXService Multiple Servers

Technologies:------------
node.js, express.js, mongodb 

Framework:------------
It is using Model/View(Response)/Controller design pattern to handle all requests. 
It is using DAO design pattern for database activity.

MongoDB Collections:---------------
members - _id, name
products - _id, name, category
orders - _id, productId, memberId, qty, rate

Http Status Code:----
200 - Success
4XX - Client Error
5XX - Server Error
