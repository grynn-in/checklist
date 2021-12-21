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
			"fieldname": "creation",
			"label": __("From Date"),
			"fieldtype": "Date",
			"width": 80,
			"reqd": 1,
			"default":dateutil.month_start()
		},
		{
			"fieldname": "creation",
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
			"options": ['', 'Sale', 'Rent', 'Lease'],
			"width": 100,
			"reqd": 0,
		}

	]
};

