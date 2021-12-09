# Copyright (c) 2021, Deepak and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document

class SalesOrder(Document):
	pass

@frappe.whitelist() 
def add() :
	# print to back end console
	print (frappe.form_dict)
	return frappe.form_dict
