if ($.isFunction($.fn.revolution)) {
	$("#revolutionSliderMedias").show().revolution({
		sliderType: "standard",
		sliderLayout: "auto",
		dottedOverlay: 'none',
		disableProgressBar: 'on',
		delay: 9000,
		navigation: {
				touch: {
                    touchenabled: "on",
                    swipe_threshold: 75,
                    swipe_min_touches: 1,
                    swipe_direction: "horizontal",
                    drag_block_vertical: false
                },
			arrows: {
				style: "custom",
				enable: true,
				hide_onmobile: false,
				hide_onleave: false,
				tmp: '',
				left: {
					h_align: "left",
					v_align: "center",
					h_offset: 30,
					v_offset: 0
				},
				right: {
					h_align: "right",
					v_align: "center",
					h_offset: 30,
					v_offset: 0
				}
			}
			
		},

		gridwidth: 1230,
		gridheight: 655,
		lazyType: "smart",
		shadow: 0,
		spinner	: "",
		stopLoop: "off",
		stopAfterLoops: -1,
		stopAtSlide: -1,
		shuffle: "off",
		autoHeight: "off",
		disableProgressBar: "on",
		hideThumbsOnMobile: "off",
		hideSliderAtLimit: 0,
		hideCaptionAtLimit: 0,
		hideAllCaptionAtLilmit: 0,
		debugMode: false,
		fallbacks: {
			simplifyAll: "off",
			nextSlideOnWindowFocus: "off",
			disableFocusListener: false,
		}
	});
}
