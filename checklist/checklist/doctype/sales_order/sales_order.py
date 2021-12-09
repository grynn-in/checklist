# Copyright (c) 2021, Deepak and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document

class SalesOrder(Document):
	
	def on_submit (self) :

		doc = self.as_dict()

		# get the item codes
		ic  = ""
		for i in doc.get ("sales_order_items") :
			print (i , "\n")
			ic = ic + i.get("item_name") + "\n"
			
		
		# create a new document
		doc = frappe.get_doc({
    		'doctype': 'Note',
    		'title': self.name + " " + self.doctype,
			'content' : ic,
			'public' : 1
		})

		doc.insert()

		self.db_set("note", doc.name, commit=True)
		
		## to prevent submission of doc
		# frappe.throw (" ")
				
	def on_cancel (self) :
		# get the sales order
		# get the reference note name
		note  = frappe.get_doc("Note", self.note)
		print (note.as_dict())
		note.delete ()
		



@frappe.whitelist() 
def add() :
	# print to back end console
	print (frappe.form_dict)
	return frappe.form_dict
