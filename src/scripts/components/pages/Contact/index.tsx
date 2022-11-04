import React from 'react'
import {Renderer} from '@/utils/Renderer'
import {Form} from '@/components/pages/Contact/Partials/Form'

export function init() {
	Renderer(<Form />, '#js-contactForm');
}
