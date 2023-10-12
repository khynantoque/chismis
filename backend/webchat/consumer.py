from channels.generic.websocket import WebsocketConsumer

class MyConsumer(WebsocketConsumer):
    
    def connect(self):
        # Called on connection.
        # To accept the connection call:
        self.accept()
        
    def receive(self, text_data=None, bytes_data=None):
        self.send(text_data="Hello world!")
        # Or, to send a binary frame:
        self.close()
        

    def disconnect(self, close_code):
        # Called when the socket closes
        pass