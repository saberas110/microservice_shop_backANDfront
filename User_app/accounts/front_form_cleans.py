from xml.dom import ValidationErr

from django.template.defaultfilters import length


def clean_otp_form(phon_number):
    if length(phon_number)!=11:
        raise ValidationErr('this phone number is not valid')
    else:
        return phon_number
