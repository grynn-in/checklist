# Copyright (c) 2021, Deepak and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document

class SalesOrder(Document):
	@frappe.whitelist()
	def get_tax_amount (self) : 
		return 10 * 7.7




