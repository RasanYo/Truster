class Group:
    
    def __init__(self, name, link, city, requested, requester_email, requester_password):
        self.name = name
        self.link = link
        self.city = city
        self.requested = requested
        self.requester_email = requester_email
        self.requester_password = requester_password
        
    def toJSON(self):
        return {
            'name': self.name,
            'link': self.link,
            'city': self.city,
            'requested': self.requested,
            'requester_email': self.requester_email,
            'requester_password': self.requester_password
        }
        
    def setRequested(self, wasRequested):
        self.requested = wasRequested