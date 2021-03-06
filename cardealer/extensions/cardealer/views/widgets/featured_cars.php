<?php if (!defined('ABSPATH')) die('No direct access allowed'); ?>
<?php
$meta_query_array = array();

$meta_query_array[] = array(
	'key' => 'car_is_featured',
	'value' => 1,
	'type' => 'numeric',
	'compare' => '=',
);

if(!defined('ICL_LANGUAGE_CODE')){
	$meta_query_array[] = array(
		'key' => '_icl_lang_duplicate_of',
		'value' => '',
		'compare' => 'NOT EXISTS'
	);
}

$args = array(
	'post_type' => TMM_Ext_PostType_Car::$slug,
	'showposts' => $instance['post_number'],
	'meta_query' => $meta_query_array,
	'orderby' => ($instance['order'] == 'random' ? 'rand' : 'post_modified_gmt'),
	'order' => ($instance['order'] != 'random' ? $instance['order'] : 'DESC'),
);

$query = new WP_Query($args);
global $post;
?>

<div class="widget widget_latest">

	<?php if ($instance['title'] != '') { ?>
		<h3 class="widget-title"><?php _e($instance['title'], 'cardealer'); ?></h3>
	<?php } ?>

    <ul class="clearfix">

		<?php if ($query->have_posts()) : while ($query->have_posts()) : $query->the_post(); ?>
				<?php
				$car_data = TMM_Ext_PostType_Car::get_car_data($post->ID);

				$user_id    = get_post_field( 'post_author', $post->ID );
				$car_photos = TMM_Ext_PostType_Car::get_post_photos( $post->ID, $user_id, 'thumb' );
				$icon_class = '';
				if ( ! empty( $car_photos ) && count( $car_photos ) > 1 ) {
					$icon_class .= ' picture';
				}
				if ( isset( $car_data['cars_videos'][0] ) && ! empty( $car_data['cars_videos'][0] ) ) {
					$icon_class .= ' video';
				}
				?>
				<li>

					<a href="<?php the_permalink(); ?>" class="thumb single-image<?php echo $icon_class; ?>">

						<img alt="" src="<?php echo tmm_get_car_cover_image($post->ID, 'single_thumb_widget') ?>">

					</a>

					<div class="table-entry">

						<h4>
							<a href="<?php the_permalink(); ?>">
								<?php tmm_get_car_title($post->ID, 1); ?>
							</a>
						</h4>

						<p class="specs">
							<?php
							if(!empty($car_data['car_engine_size'])){
								echo $car_data['car_engine_size'] . TMM::get_option('engine_capacity_unit', TMM_APP_CARDEALER_PREFIX) . ' ';
								if(!empty($car_data['car_mileage'])){
									echo ', ';
								}
							}
							if(!empty($car_data['car_mileage'])){
								echo $car_data['car_mileage'] . TMM::get_option('distance_unit', TMM_APP_CARDEALER_PREFIX);
							}
							?>
						</p>

						<span class="price">
							<?php echo esc_html( tmm_get_car_price($post->ID) ); ?>
						</span>

					</div><!--/ .table-entry-->

				</li>

				<?php
			endwhile;
		endif;

		wp_reset_postdata();
		?>

    </ul>

	<?php if ($instance['show_see_all_button'] == "true"):
			$searching_page = TMM_Helper::get_permalink_by_lang( TMM::get_option('searching_page', TMM_APP_CARDEALER_PREFIX) );
		?>
		<a class="button orange" href="<?php echo $searching_page; ?>"><?php _e('All Cars', 'cardealer'); ?></a><br />
	<?php endif; ?>

</div><!--/ .widget-->

