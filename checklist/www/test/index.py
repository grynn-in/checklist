# about.py
import frappe

def get_context(context):

    context.about_us = "Hello from Python"
    context.people = ["deepak", "emm", "ant-man"]
    # context.sales_order = frappe.get_list("Sales Order", pluck=["name","grand_totals"])
    context.sales_order = frappe.get_list("Sales Order")
    return context



