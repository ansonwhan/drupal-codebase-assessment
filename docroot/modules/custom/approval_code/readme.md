This module manages approval Codes on websites.

Global configuration is on: /admin/config/content/approval-codes

Node-specific configuration is done on the node edit page.

# Available Twig variables:
These variables are exposed to the page template.
They should be placed on the global page template and the module will select
the correct value to output to this variable.
* approval_code: This is the approval code to be set on the page.
* approval_date_raw: Formatted as YYYY-MM-DD, Example: 2018-01-01.
* approval_date_formatted: Formatted as Month Year, Example: January 2018.

## Printing in twig:
```
{% if page.approval_code is defined %}
  {{ page.approval_code }}
{% endif %}

{% if page.approval_date_raw is defined %}
  {{ page.approval_date_raw }}
{% endif %}

{% if page.approval_date_formatted is defined %}
  {{ page.approval_date_formatted }}
{% endif %}
```

## Placing as blocks

Two blocks are available for placement on the footer. These are:

`approval Code`

and

`approval Date`

They need no configuration at the block level, they are designed to be placed once and managed using the approval admin and node configuration.

# Mobile approval codes

There are fields for setting a Mobile approval Code on both the Global approval configuration and Node-specific. When a mobile approval is set, two tags will displayed indicating mobile and desktop version codes/dates. They will display as follows:

```
<span class="mobile-only">Mobile approval Code</span>
<span class="desktop-only">Desktop approval Code</span>
```
