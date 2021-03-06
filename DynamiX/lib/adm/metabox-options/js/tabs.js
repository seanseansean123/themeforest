	
	// ACODA Admin Tabs / Options
	jQuery(document).ready(function($) {
		
		'use strict';
		
		// Add MetaBox Menu and jQuery Mobile Wrapper
		var postbox_id = $('.cmb_metabox').parents('.postbox-container').attr('id');	
			
		$( meta_box_data.meta_box_ids ).addClass('group_meta_box');
			
		$('#'+ postbox_id +' .group_meta_box').wrapAll('<div class="clearfix" id="nv_meta_boxes" /></div>');
			
		// Show tabs if more than one
		if( meta_box_data.meta_box_count > 1 ) 
		{
			if( $('#' + postbox_id).length ) $('<h2 class="nav-tab-wrapper clearfix">'+ meta_box_data.meta_box_menu +'</h2>').insertBefore('#nv_meta_boxes');
		}

		// Switches option sections
		$('.group_meta_box').hide();
		var activetab = '';
		if (typeof(localStorage) != 'undefined' ) {
			activetab = localStorage.getItem("activetab");
		}
		if (activetab != '' && $(activetab).length ) {
			$(activetab).fadeIn();
		} else {
			$('.group_meta_box:first').fadeIn();
		}
		$('.group_meta_box .collapsed').each(function(){
			$(this).find('input:checked').parent().parent().parent().nextAll().each( 
				function(){
					if ($(this).hasClass('last')) {
						$(this).removeClass('hidden');
							return false;
						}
					$(this).filter('.hidden').removeClass('hidden');
				});
		});
		
		if (activetab != '' && $(activetab + '-tab').length ) {
			$(activetab + '-tab').addClass('nav-tab-active');
		}
		else {
			$('.nav-tab-wrapper a:first').addClass('nav-tab-active');
		}
		$('.nav-tab-wrapper a').click(function(evt) {
			$('.nav-tab-wrapper a').removeClass('nav-tab-active');
			$(this).addClass('nav-tab-active').blur();
			var clicked_group = $(this).attr('href');
			if (typeof(localStorage) != 'undefined' ) {
				localStorage.setItem("activetab", $(this).attr('href'));
			}
			$('.group_meta_box').hide();
			$(clicked_group).fadeIn();
			evt.preventDefault();
			
			// Editor Height (needs improvement)
			$('.wp-editor-wrap').each(function() {
				var editor_iframe = $(this).find('iframe');
				if ( editor_iframe.height() < 30 ) {
					editor_iframe.css({'height':'auto'});
				}
			});
		
		});		
		
		// Data Source
		$('.cmb_metabox .control input[type=radio]').live('change', function() {  
			
			var data_value = $(this).data( $(this).data('control') ),
				curr_data_value = $('.datasource_select select').val(),
				data_source = '';
			
			$(".cmb_metabox .gallery_section, tr.data-source").hide();
			
			if( curr_data_value !='' && curr_data_value !== undefined )
			{
				data_source = ', tr.data-source.'+ curr_data_value;
			}
			else
			{
				data_source = '';
			}
			
			if ( data_value !='none' && data_value.length !== 0 ) {
				$('.cmb_metabox .show_all,.cmb_metabox .show_'+ data_value +', .cmb_metabox .gallery_section.'+ data_value + data_source ).not('.hide_'+data_value+',.none').fadeIn();
			}
			
		});
		
		// Show Data Source on Selection
		$('.datasource_select select').live('change', function()
		{
			var data_value = $(this).val();
			
			$("tr.data-source").hide();
			
			if( data_value !='' )
			{
				$('tr.data-source.'+ data_value).fadeIn();
			}
		});
		
		
		// Show Data Source on Load
		var curr_data_value = $('.datasource_select select').val(),
			control_value = $('.cmb_metabox .control input[type=radio]:checked').data( $('.cmb_metabox .control input[type=radio]:checked').data('control') );
			
		if( typeof control_value !== 'undefined' && control_value !== 'none' && control_value.length !== 0  )
		{
			$(".cmb_metabox .gallery_section, tr.data-source").hide();
			
			if( curr_data_value !='' && curr_data_value !== undefined )
			{
				$('.cmb_metabox .show_all, .cmb_metabox .show_'+ control_value +', .cmb_metabox .gallery_section.'+ control_value +', tr.data-source.'+ curr_data_value ).not('.hide_'+ control_value +',.none').fadeIn();
			}
			else if ( curr_data_value !== undefined )
			{
				$("tr.data-source").hide();	
				$('.cmb_metabox .show_all,.cmb_metabox .show_'+ control_value +', .cmb_metabox .gallery_section.'+ control_value ).not('.hide_'+ control_value +',.none').fadeIn();
			}
		}
		else
		{
			$(".cmb_metabox .gallery_section, tr.data-source").hide();
		}		
	});