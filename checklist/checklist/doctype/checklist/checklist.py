# Copyright (c) 2021, Deepak and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document


class Checklist(Document):
	# pass
	def validate(self):  
		""" 
		validate data
		"""
		# if len(self.description) > 10 : 
		# 	frappe.log_error("Description length > 10 characters")
		# 	frappe.throw("Description length > 10 characters")  # ends execution
		pass

	def before_insert(self):  
		""" 
		only excecuted before the first insert, not update
		used for back end validations should be done here
		to say that all the mininmum required stuff is available and validated
		"""
		#print(self.name) # on bench console
		#frappe.msgprint("coming from the back end") # sends a message to the front end
		#frappe.throw("an error occured")  # ends execution
		pass

	def after_insert(self):
		# only once, after inserting, does not execute after update
		frappe.msgprint("Successful") 

	def on_update(self):
		# only once, after inserting, does not execute after update
		frappe.msgprint("Successfully updated") 


		# 0 : draft
		# 1 : submitted
		# 2 : cancelled

