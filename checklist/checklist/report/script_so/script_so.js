// Copyright (c) 2016, Deepak and contributors
// For license information, please see license.txt
/* eslint-disable */

frappe.query_reports["script SO"] = {
	"filters": [
		{
			"fieldname": "name",
			"label": __("Sales Order"),
			"fieldtype": "Link",
			"options" : "Sales Order",
			"width": 100,
			"reqd": 0,
		},
		{
			"fieldname": "creation_from",
			"label": __("From Date"),
			"fieldtype": "Date",
			"width": 80,
			"reqd": 1,
			"default":dateutil.month_start()
		},
		{
			"fieldname": "creation_to",
			"label": __("To Date"),
			"fieldtype": "Date",
			"width": 80,
			"reqd": 1,
			"default":dateutil.month_end()
		},
		{
			"fieldname": "status",
			"label": __("Status"),
			"fieldtype": "Select",
			"default": "",
			"options": ['', 'Draft', 'Submitted', 'Cancelled'],
			"width": 100,
			"reqd": 0,
		}
	]
};

